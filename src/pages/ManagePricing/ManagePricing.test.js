import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { ApolloProvider } from '@apollo/react-hooks'
import { MockedProvider } from '@apollo/react-testing'
import wait from 'waait'
import apolloClient from 'apolloClient'
import ManagePricing from './ManagePricing'
import HostPricingQuery from 'graphql/HostPricingQuery.gql'
import UpdateHostPricingMutation from 'graphql/UpdateHostPricingMutation.gql'
import { UNITS } from 'models/HostPricing'
import mockHha from 'mock-dnas/hha'

// mocking Header because it depends on Router
jest.mock('components/Header')

const mockHostPricing = {
  units: 'cpu',
  pricePerUnit: '12'
}

const newPrice = '9'

const updateHostPricingMock = {
  request: {
    query: UpdateHostPricingMutation,
    variables: { units: UNITS.storage, pricePerUnit: newPrice }
  },
  result: {
    data: { updateHostPricing: { units: 'not', pricePerUnit: 'used' } }
  },
  newData: jest.fn()
}

const mocks = [
  {
    request: {
      query: HostPricingQuery
    },
    result: {
      data: {
        hostPricing: mockHostPricing
      }
    }
  },
  updateHostPricingMock,
  {
    request: {
      query: UpdateHostPricingMutation,
      variables: { units: UNITS.cpu, pricePerUnit: newPrice }
    },
    result: {
      data: { updateHostPricing: { units: 'not', pricePerUnit: 'used' } }
    }
  }
]

describe('ManagePricing', () => {
  it('renders', async () => {
    const props = {
      history: {}
    }

    let getByLabelText, getByText
    await act(async () => {
      ({ getByLabelText, getByText } = render(<ApolloProvider client={apolloClient}>
        <ManagePricing {...props} />
      </ApolloProvider>))
      await wait(0)
    })

    expect(getByText('Price Settings')).toBeInTheDocument()
    expect(getByText('CPU = 5 HF per second')).toBeInTheDocument()
    expect(getByLabelText('Holofuel per unit').value).toEqual(mockHha.provider.get_service_log_details.price_per_unit)
  })

  it('allows you to set and save units and pricePerUnit', async () => {
    const props = {
      history: {}
    }
    let getByLabelText, getByText, getByTestId

    await act(async () => {
      ({ getByLabelText, getByText, getByTestId } = render(<MockedProvider mocks={mocks} addTypename={false}>
        <ManagePricing {...props} />
      </MockedProvider>))
      await wait(0)
    })

    fireEvent.change(getByTestId('units-dropdown'), { target: { value: UNITS.storage } })

    fireEvent.change(getByLabelText('HoloFuel per unit'), { target: { value: newPrice } })

    fireEvent.click(getByText('Save'))

    expect(updateHostPricingMock.newData).toHaveBeenCalled()
  })

  it('changes button state based on user actions', async () => {
    const props = {
      history: {}
    }

    let getByText, getByLabelText
    await act(async () => {
      ({ getByText, getByLabelText } = render(<MockedProvider mocks={mocks} addTypename={false}>
        <ManagePricing {...props} />
      </MockedProvider>))
      await wait(0)
    })

    expect(getByText('Save')).toHaveAttribute('disabled')

    fireEvent.change(getByLabelText('HoloFuel per unit'), { target: { value: newPrice } })

    expect(getByText('Save')).not.toHaveAttribute('disabled')

    act(() => {
      fireEvent.click(getByText('Save'))
    })

    expect(getByText('Saving')).toHaveAttribute('disabled')

    await act(() => wait(0))

    expect(getByText('Saved')).toHaveAttribute('disabled')

    fireEvent.change(getByLabelText('HoloFuel per unit'), { target: { value: '123' } })

    expect(getByText('Save')).not.toHaveAttribute('disabled')
  })
})

import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { isEmpty } from 'lodash/fp'
import useForm from 'react-hook-form'
import * as yup from 'yup'
import Loader from 'react-loader-spinner'
import HolofuelRequestMutation from 'graphql/HolofuelRequestMutation.gql'
import HolofuelCounterpartyQuery from 'graphql/HolofuelCounterpartyQuery.gql'
import PrimaryLayout from 'holofuel/components/layout/PrimaryLayout'
import HashIcon from 'holofuel/components/HashIcon'
import Button from 'holofuel/components/Button'
import useFlashMessageContext from 'holofuel/contexts/useFlashMessageContext'
import { presentAgentId, presentHolofuelAmount } from 'utils'
import './CreateRequest.module.css'

// TODO: this constants should come from somewhere more scientific
const AGENT_ID_LENGTH = 63

const FormValidationSchema = yup.object().shape({
  counterparty: yup.string()
    .required()
    .length(AGENT_ID_LENGTH),
  amount: yup.number()
    .required()
    .positive()
})

function useRequestMutation () {
  const [offer] = useMutation(HolofuelRequestMutation)
  return (amount, counterparty) => offer({
    variables: { amount, counterparty }
  })
}

export default function CreateRequest ({ history: { push } }) {
  const createRequest = useRequestMutation()

  const [counterparty, setCounterparty] = useState('')

  const { register, handleSubmit, errors } = useForm({ validationSchema: FormValidationSchema })

  const { newMessage } = useFlashMessageContext()

  const onSubmit = ({ amount, counterparty }) => {
    createRequest(amount, counterparty)
    push('/history')
    newMessage(`Request for ${presentHolofuelAmount(amount)} HF sent to ${presentAgentId(counterparty)}.`, 5000)
  }

  !isEmpty(errors) && console.log('Request form errors (leave here until proper error handling is implemented):', errors)

  return <PrimaryLayout headerProps={{ title: 'Request' }}>
    <div styleName='help-text'>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </div>
    <form styleName='request-form' onSubmit={handleSubmit(onSubmit)}>
      <div styleName='form-row'>
        <label htmlFor='counterparty' styleName='form-label'>From</label>
        <input
          name='counterparty'
          id='counterparty'
          styleName='form-input'
          ref={register}
          onChange={({ target: { value } }) => setCounterparty(value)} />
        <div styleName='hash-icon-wrapper'>
          {counterparty.length === AGENT_ID_LENGTH && <HashIcon hash={counterparty} size={26} />}
        </div>
        <div styleName='hash-nickname-wrapper'>
          {counterparty.length === AGENT_ID_LENGTH && <h4 data-testid='counterparty-nickname'><RenderNickname agentId={counterparty} /></h4>}
        </div>
      </div>
      <div styleName='form-row'>
        <label htmlFor='amount' styleName='form-label'>Amount</label>
        <input
          name='amount'
          id='amount'
          type='number'
          styleName='number-input'
          ref={register} />
        <span styleName='hf'>HF</span>
      </div>
      <Button type='submit' wide variant='secondary' styleName='send-button'>Send</Button>
    </form>
  </PrimaryLayout>
}

export function RenderNickname ({ agentId }) {
  const { loading, error, data } = useQuery(HolofuelCounterpartyQuery, {
    variables: { agentId }
  })

  // const { newMessage } = useFlashMessageContext()

  if (loading) {
    return <React.Fragment>
      <Loader
        type='ThreeDots'
        color='#00BFFF'
        height={30}
        width={30}
        timeout={5000}
      />
       Loading
    </React.Fragment>
  }
  // NB: TODO: Resolve the Flash Message ERROR:
  // if (error || !data.holofuelCounterparty.nickname) { return newMessage(`No nickname available.`, 5000) }
  if (error || !data.holofuelCounterparty.nickname) { return 'No nickname available.' }
  return <React.Fragment>{data.holofuelCounterparty.nickname}</React.Fragment>
}

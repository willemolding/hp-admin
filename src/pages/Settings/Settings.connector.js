// import React from 'react'
import { graphql, compose } from 'react-apollo'
import AllHPSettingsQuery from 'graphql/AllHPSettingsQuery.gql'
import UpdateHPSettingsMutation from 'graphql/UpdateHPSettingsMutation.gql'
import FactoryResetMutation from 'graphql/FactoryResetMutation.gql'
import ToggleSshAccessMutation from 'graphql/ToggleSshAccessMutation.gql'

const allHPSettings = graphql(AllHPSettingsQuery, {
  props: ({ data: { allHPSettings } }) => ({ allHPSettings })
})

const updateHPSettings = graphql(UpdateHPSettingsMutation, {
  props: ({ mutate }) => {
    return {
      updateHPSettings: ({ newHPSettings }) => {
        mutate({
          variables: {
            newHPSettings
          },
          update: (cache, { data: { updateHPSettings } }) => {
            if (updateHPSettings) {
              cache.writeQuery({
                query: AllHPSettingsQuery,
                data: {
                  allHPSettings: updateHPSettings
                }
              })
            }
          }
        })
      }
    }
  }
})

const factoryReset = graphql(FactoryResetMutation, {
  props: ({ mutate }) => ({
    factoryReset: () => mutate()
  })
})

const toggleSshAccess = graphql(ToggleSshAccessMutation, {
  props: ({ mutate }) => ({
    toggleSshAccess: () => mutate()
  })
})

export default compose(
  allHPSettings,
  updateHPSettings,
  factoryReset,
  toggleSshAccess
)

// Previous Mocked Data
// const mockedData = {
//   hostName: 'My Host',
//   hostPubKey: 'hcsFAkeHashSTring2443223ee',
//   hostEmail: 'iamahost@hosting.com',
//   deviceName: 'My Very First HoloPort',
//   networkId: 'my-holoport',
//   sshAccess: false,
//   ports: {
//     deviceAdminPort: '6609',
//     hcAdminPort: '8800',
//     hcNetworkPort: '35353',
//     hostingPort: '8080'
//   },
//   factoryReset: () => Promise.resolve(true),
//   toggleSshAccess: () => Promise.resolve(true)
// }

// const withMockedData = ComponentToBeWrapped => props =>
//   <ComponentToBeWrapped {...mockedData} {...props} />
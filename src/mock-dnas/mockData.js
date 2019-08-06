// data is a tree organized by instanceId > zome > function
// leaves can either be data, or a function which is called with the zome call args, so can update other parts of the tree.

const data = {
  hylo: {
    people: {
      get_me: {
        address: 'fdkljsklj',
        name: 'H.P. Owner',
        avatar_url: 'myface.png'
      },
      is_registered: true,
      register_user: args => {
        data.hylo.people.get_me = {
          ...data.hylo.people.get_me,
          ...args
        }
        return data.hylo.people.get_me
      }
    }
  },
  'happ-store': {
    whoami: {
      get_user: {
        hash: 'browns',
        name: 'H.P. Owner'
      }
    },
    happs: {
      get_app: arg => {
        const happ_entry = data['happ-store'].happs.get_all_apps.find(entry => entry.address === arg)
        console.log("happ_entry");
        const result = {
          address : happ_entry.address,
          app_entry : happ_entry.appEntry,
          upvotes: 0, // fake data placeholder; here solely for mock struct accuracy
          upvotedByMe: false // fake data placeholder; here solely for mock struct accuracy
        }
        console.log("HAPP-STORE: get_app result : xxx for arg: xxx : ", result, arg)
        return result
      },
      get_all_apps: [
        {
          address: 'QmXxiimzfcSHYqHXV2z6WNopeiFnPBx9YKnHzPcq9o8VoT',
          appEntry: {
            title: 'Holofuel',
            author: 'Holo ltd',
            description: 'The holofuel hApp',
            thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2cMFvYqaw7TtcTkPFcwE8pupKWqLFMCFu2opap9jqUoqIcAKB',
            homepageUrl: 'https://holo.host/faq/what-is-holo-fuel/',
            dnas: [
              {
                location: 'someurl.com/dna',
                hash: 'foiyuoiyZXBVNBVCuibce',
                handle: 'bars'
              }
            ],
            ui: {
              location: 'someurl.com/ui',
              hash: 'flkjdflksdjfldskjf',
              handle: null // Currently ui handles are not being used and will return null. (ex. of desired: handle: = 'QmHHAHappHandle1')
            }
          },
          upvotes: 0,
          upvotedByMe: false
        },
        {
          address: 'QmXx7imYqHXV2z6WNopeiFnPBx9YKnHzPcq9o8VoTzfcSH',
          appEntry: {
            title: 'Holo Community',
            author: 'Holo ltd',
            description: 'The community chat and message board hApp',
            thumbnailUrl: 'https://d3ngex8q79bk55.cloudfront.net/misc/default_community_avatar.png',
            homepageUrl: 'https://hylo.com',
            dnas: [
              {
                location: 'someurl.com/dna',
                hash: 'sd;lmsdl;masd;lmds;lmasdlsadm;ldmo',
                handle: 'bars'
              }
            ],
            ui: {
              location: 'someurl.com/ui',
              hash: 'flkjdflksdjfldskjf',
              handle: null
            }
          },
          upvotes: 0,
          upvotedByMe: false
        }
      ]
    }
  },
  hha: {
    host: {
      register_as_host: () => {
        const address = 'QmHHAHostRegistrationAddress'
        data.hha.host.is_registered_as_host = { links: [{ address }] }
        return address
      },
      is_registered_as_host: {
        links: []
      },
      get_all_apps: [
        {
          hash: 'QmHHAHappEntryAddressHash1',
          details: 'QmXxiimzfcSHYqHXV2z6WNopeiFnPBx9YKnHzPcq9o8VoT'
        },
        {
          hash: 'QmHHAHappEntryAddressHash2',
          details: 'QmXx7imYqHXV2z6WNopeiFnPBx9YKnHzPcq9o8VoTzfcSH'
        }
      ],
      get_enabled_app_list: [
        { happ_hash: 'QmHHAHappEntryAddressHash1' }
      ]
    },
    provider: {
      get_app_details: arg => {
        const happ_entry = data.hha.host.get_all_apps.find(entry => entry.hash === arg) || null
        console.log("happ_entry: ", happ_entry)
        let result = null
        if(happ_entry) {
          result = {
            app_bundle : happ_entry.hash,
            app_details : happ_entry.details,
            payment_pref: ["N/A : This is just a placeholder for mock data..."]
          }
          console.log("HHA: get_app_details result : xxx for arg: xxx : ", result, arg)
        }
        else{}
        return result
      }
    }
  }
}

export default data

const appOne = {
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
}

const appTwo = {
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

const happStore = {
  whoami: {
    get_user: {
      hash: 'browns',
      name: 'H.P. Owner'
    }
  },
  happs: {
    get_app: id => [appOne, appTwo].find(app => app.address === id),
    get_all_apps: [appOne, appTwo]
  }
}

export default happStore
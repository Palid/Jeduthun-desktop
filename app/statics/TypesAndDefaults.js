export const albumObject = {
  cover: '',
  id: '',
  title: '',
  description: '',
  link: ''
}

export const albumStatus = [
  'NEW',
  'PLAYING',
  'PAUSED',
  'READY',
  'ERROR'
]

export const youtubeSearchConfig = {
  maxResults: 10,
  key: 'AIzaSyDSYCcZfNICbkuweKxnrpCLTse_nO_FFgA',
  safeSearch: 'none',
  type: 'video'
}

export const videoLengths = [
  {
    label: 'Short',
    value: 'short'
  },
  {
    label: 'Medium',
    value: 'medium'
  },
  {
    label: 'Long',
    value: 'long'
  }
]

export const videoQualities = [
  {
    label: 'Any',
    value: 'any'
  },
  {
    label: 'High',
    value: 'high'
  },
  {
    label: 'Standard',
    value: 'standard'
  }
]

export const listOrdering = [
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Rating',
    value: 'rating'
  },
  {
    label: 'Relevance',
    value: 'relevance'
  },
  {
    label: 'Title',
    value: 'title'
  },
  {
    label: 'Views count',
    value: 'viewCount'
  }
]

export const searchDefaults = {
  stringMain: '',
  stringOr: '',
  stringNot: '',
  videoLength: 'short',
  videoQuality: 'any',
  resultsOrder: 'relevance',
  resultsPerPage: '12'
}

export const playerDefaults = {
  state: 'STOP',
  drive: {
    title: '',
    file: ''
  },
  options: {
    sound: true,
    shuffle: false,
    repeatOne: false,
    repeatALL: false,
    recording: false
  },
  memory: {
    last: '',
    prev: ''
  }
}

export const playlistDefaults = {
  order: 'titleDes',
  tracks: []
}

export const playlistOrdering = [
  {
    label: 'Title ascending',
    value: 'titleAsc'
  },
  {
    label: 'Title descending',
    value: 'titleDes'
  },
  {
    label: 'Last modified date',
    value: 'modified'
  },
  {
    label: 'Created date',
    value: 'created'
  }
]
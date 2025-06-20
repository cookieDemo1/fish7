import request, { BaseResponse } from '@/api/request'

export const GET = 'GET'
export const POST = 'POST'
export const DELETE = 'DELETE'
export const PUT = 'PUT'

export const requestApi = {
  switch: {
    url: () => '/api/red/switches',
    methods: ['GET']
  },
  controlSwitch: {
    url: () => '/api/red/control',
    methods: ['POST']
  },
  char: {
    url: () => '/api/red/sensor',
    methods: ['GET']
  },
  freq: {
    url: () => '/api/red/freq',
    methods: ['POST']
  },
  taskSwitch: {
    url: () => `/api/red/auto/task/sub/switch`,
    methods: [GET]
  },
  subTask: {
    url: ({ id = '' }) => `/api/red/auto/task/sub?id=${id}`,
    methods: [GET, POST, PUT, DELETE]
  },
  autoTask: {
    url: () => `/api/red/auto/task`,
    methods: [GET]
  },
  autoTaskScene: {
    url: ({ id = '' }) => `/api/red/auto/task/scene?id=${id}`,
    methods: [POST, PUT, DELETE]
  },
  autoTaskSceneExec: {
    url: () => `/api/red/auto/task/scene/exec`,
    methods: [POST]
  },
  autoTaskTimer: {
    url: ({ id = '' }) => `/api/red/auto/task/timer?id=${id}`,
    methods: [POST, PUT, DELETE]
  },
  autoTaskCondition: {
    url: ({ id = '' }) => `/api/red/auto/task/condition?id=${id}`,
    methods: [POST, PUT, DELETE]
  },
  autoTaskConditionOption: {
    url: () => `/api/red/auto/condition/option`,
    methods: [GET]
  },
  autoTaskLoop: {
    url: ({ id = '' }) => `/api/red/auto/task/cycle?id=${id}`,
    methods: [POST, PUT, DELETE]
  },
  autoTaskDetail: {
    url: ({ id = '' }) => `/api/red/auto/task/detail?id=${id}`,
    methods: [GET]
  },
  autoTaskDisable: {
    url: ({ id = '' }) => `/api/red/auto/task/disable?id=${id}`,
    methods: [POST]
  }
  // taskList: {
  //   url: () => '/api/red/auto/tasks',
  //   methods: ['GET']
  // },
  // warningList: {
  //   url: () => '/api/red/auto/warn',
  //   methods: ['GET']
  // },
  // executeTask: {
  //   url: () => '/api/red/auto/sceneExec',
  //   methods: ['POST']
  // }
}
type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE'
type RequestURL = (params?: any) => string
type RequestAction = (params?: any) => Promise<BaseResponse>
type RequestActions = Record<METHODS, (url: RequestURL) => RequestAction>
const requestActions: RequestActions = {
  GET: (url) => (params) => {
    const { headers = {}, ...data } = params ?? {}
    return request({
      url: url(params || {}),
      method: 'GET',
      headers,
      data
    })
  },

  POST: (url) => (params) => {
    const { headers = {}, ...data } = params ?? {}

    return request({
      url: url(params || {}),
      method: 'POST',
      headers,
      data
    })
  },

  PUT: (url) => (params) => {
    const { headers = {}, ...data } = params ?? {}
    return request({
      url: url(params || {}),
      method: 'PUT',
      headers,
      data
    })
  },

  DELETE: (url) => (params) => {
    const { headers = {}, ...data } = params ?? {}
    return request({
      url: url(params || {}),
      method: 'DELETE',
      headers,
      data
    })
  }
}

export type RequestApi = Record<
  keyof typeof requestApi,
  {
    url: RequestURL
    methods: Array<METHODS>
  }
>
type ConcatenateKeys<T extends string, U extends string> = `${Lowercase<T>}${Capitalize<U>}`
export type Requests = Partial<Record<ConcatenateKeys<METHODS, keyof RequestApi>, RequestAction>>
function createRequests(): Requests {
  const requests: any = {}
  Object.entries(requestApi).forEach(([name, { url, methods }]) => {
    methods.forEach((method) => {
      const requestKey = method.toLowerCase() + name[0].toUpperCase() + name.slice(1)
      const requestValue = requestActions[method](url)
      requests[requestKey] = requestValue
    })
  })

  return requests
}

const requests = createRequests()
export default requests

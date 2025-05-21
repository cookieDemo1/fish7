import request, { BaseResponse } from '@/api/request'

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
  }
}
type METHODS = 'GET' | 'POST' | 'PUT' | 'DELETE'
type RequestURL = (params?: any) => string
type RequestAction = (params?: any) => Promise<BaseResponse>
type RequestActions = Record<METHODS, (url: RequestURL) => RequestAction>
const requestActions: RequestActions = {
  GET: (url) => (params) => {
    const { simple = true, ...rest } = params ?? {}
    if (simple) {
      return request({
        url: url(params),
        method: 'GET',
        params: rest
      })
    } else {
      const { search, headers } = rest ?? {}
      return request({
        url: url(params),
        method: 'GET',
        headers,
        params: search
      })
    }
  },

  POST: (url) => (params) => {
    const { simple = true, ...rest } = params ?? {}
    if (simple) {
      return request({
        url: url(params),
        method: 'POST',
        data: rest
      })
    } else {
      const { search, headers, data } = rest ?? {}
      return request({
        url: url(params),
        method: 'POST',
        params: search,
        headers,
        data
      })
    }
  },

  PUT: (url) => (params) => {
    const { simple = true, ...rest } = params ?? {}
    if (simple) {
      return request({
        url: url(params),
        method: 'PUT',
        data: rest
      })
    } else {
      const { search, headers, data } = rest ?? {}
      return request({
        url: url(params),
        method: 'PUT',
        params: search,
        headers,
        data
      })
    }
  },

  DELETE: (url) => (params) => {
    const { simple = true, ...rest } = params ?? {}
    if (simple) {
      return request({
        url: url(params),
        method: 'DELETE',
        data: rest
      })
    } else {
      const { search, headers, data } = rest ?? {}
      return request({
        url: url(params),
        method: 'DELETE',
        params: search,
        headers,
        data
      })
    }
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

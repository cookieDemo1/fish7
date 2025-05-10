import request, { BaseResponse } from '@/api/request'

export const requestApi = {
  userLogin: {
    url: () => '/api/web/login',
    methods: ['POST']
  },
  projects: {
    url: () => '/api/web/projects',
    methods: ['GET']
  },
  info: {
    url: () => '/api/web/info',
    methods: ['GET']
  },
  sensor: {
    url: () => `/api/web/data`,
    methods: ['GET']
  },
  chart: {
    url: () => `/api/web/chart`,
    methods: ['GET']
  },
  qrcode: {
    url: () => `/api/web/qrcode`,
    methods: ['GET']
  },
  scan: {
    url: () => `/api/web/login/scan`,
    methods: ['GET']
  }

  // modelAdd: {
  //   url: () => '/api/model/add/',
  //   methods: ['POST']
  // },
  // modelUpdate: {
  //   url: () => '/api/model/update/',
  //   methods: ['PUT']
  // },
  // modelList: {
  //   url: () => '/api/model/list/',
  //   methods: ['GET']
  // },
  // modelDel: {
  //   url: ({ id }) => `/api/model/del/?id=${id}`,
  //   methods: ['DELETE']
  // },
  // overviewDevice: {
  //   url: () => `/api/overview/device`,
  //   methods: ['GET']
  // },
  // overviewSensor: {
  //   url: () => `/api/overview/sensor`,
  //   methods: ['GET']
  // },
  // overviewUser: {
  //   url: () => `/api/overview/user`,
  //   methods: ['GET']
  // },
  // dccMonthStat: {
  //   url: () => `/api/overview/dccMonthStat`,
  //   methods: ['GET']
  // },
  // sensorRatio: {
  //   url: () => `/api/overview/sensorRatio`,
  //   methods: ['GET']
  // },
  // overviewCityRank: {
  //   url: () => `/api/overview/rank?key=city`,
  //   methods: ['GET']
  // },
  // overviewProvinceRank: {
  //   url: () => `/api/overview/rank?key=province`,
  //   methods: ['GET']
  // },
  // overviewDccStatMap: {
  //   url: () => `/api/overview/dccStatMap`,
  //   methods: ['GET']
  // }

  // modelFile: {
  //   url: ({ path }) => `/uploads/${path}`,
  //   methods: ['GET']
  // }
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

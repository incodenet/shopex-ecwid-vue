import axios, {
  type AxiosInstance,
  type Method,
  type AxiosResponse,
  type AxiosRequestHeaders
} from 'axios'

export type Config = {
  baseURL?: string
  timeout?: number
  responseType?: 'blob' | 'arraybuffer' | 'document' | 'json' | 'text' | 'stream'
}

export type Request = {
  url: string
  baseURL?: string
  method?: Method
  payload?: object
  params?: object
  data?: any
  headers?: Record<string, string>
}

export type TServerResponse<T = any> = {
  data: {
    [x: string]: any
    results: T
  }
} & AxiosResponse<T>

export class Fetcher {
  instance: AxiosInstance

  constructor({ baseURL, timeout = 90 * 1000, responseType }: Config) {
    this.instance = axios.create({
      baseURL,
      timeout,
      responseType
    })

    this.instance.interceptors.request.use((config) => {
      ;(config.headers as AxiosRequestHeaders).set(
        'Content-Type',
        config.headers['Content-Type'] || 'application/json'
      )

      return { ...config }
    })
  }

  request = ({
    method = 'GET',
    url,
    params,
    headers,
    baseURL,
    data
  }: Request): Promise<AxiosResponse> =>
    this.instance.request({
      url,
      method,
      params,
      headers,
      baseURL,
      data
    })
}

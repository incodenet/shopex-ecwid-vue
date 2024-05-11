import { Fetcher } from '@/utils'
import { ApiUrl, BaseUrl } from './constants'
import type { TCategory, TSearchResult, TServerResponse } from '@/types/api'
import { api } from '@/constants'
import { LIST_LIMIT, LIST_OFFSET } from '@/constants/pagination'

const fetcher = new Fetcher({ baseURL: BaseUrl })

const headers = { 'Access-Control-Allow-Origin': '*', Authorization: 'Bearer ' + api.authToken }

export const getCategoriesService = ({
  ...params
}: Record<string, string | number>): Promise<TServerResponse<TSearchResult<TCategory>>> =>
  fetcher.request({
    url: ApiUrl.categories,
    headers,
    params: { offset: LIST_OFFSET, limit: LIST_LIMIT, ...params }
  })

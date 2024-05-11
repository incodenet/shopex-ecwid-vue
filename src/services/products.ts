import { Fetcher } from '@/utils'
import { ApiUrl, BaseUrl } from './constants'
import type { TProduct, TSearchResult, TServerResponse } from '@/types/api'
import { api } from '@/constants'
import { LIST_LIMIT, LIST_OFFSET } from '@/constants/pagination'

const fetcher = new Fetcher({ baseURL: BaseUrl })

const headers = { 'Access-Control-Allow-Origin': '*', Authorization: 'Bearer ' + api.authToken }

export const getProductsService = ({
  ...params
}: Record<string, string | number>): Promise<TServerResponse<TSearchResult<TProduct>>> =>
  fetcher.request({
    url: ApiUrl.products,
    headers,
    params: { offset: LIST_OFFSET, limit: LIST_LIMIT, ...params }
  })

export const getProductByIdService = ({
  id,
  params
}: {
  id: string
  params: Record<string, string>
}): Promise<TServerResponse<TSearchResult<TProduct>>> =>
  fetcher.request({
    url: ApiUrl.productById(id),
    headers,
    params: { ...params }
  })

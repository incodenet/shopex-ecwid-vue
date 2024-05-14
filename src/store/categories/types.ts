import type { TCategory } from '@/types/api'
import type { IAppState } from '../types'
import type { CategoriesStateEnum } from './enums'

export interface ICategoriesState extends IAppState {
  [CategoriesStateEnum.CATEGORIES]: TCategory[]
  [CategoriesStateEnum.IS_CATEGORIES_LOADING]: boolean
}

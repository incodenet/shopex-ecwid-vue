import type { TCategory } from '@/types/api'
import type { CategoriesStateEnum } from './enums'

export interface ICategoriesState {
  [CategoriesStateEnum.CATEGORIES]: TCategory[]
  [CategoriesStateEnum.IS_CATEGORIES_LOADING]: boolean
}

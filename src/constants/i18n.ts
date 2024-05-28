import { createI18n } from 'vue-i18n'
import { messages } from './translations'
import { LocalesEnum } from '../enums'

export const i18n = createI18n({
  globalInjection: true,
  locale: LocalesEnum.RU,
  fallbackLocale: LocalesEnum.RU,
  legacy: false,
  messages
})

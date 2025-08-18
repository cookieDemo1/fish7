import { createI18n } from 'vue-i18n'
import en from '@/i18n/en'
import zh from '@/i18n/zh'
const { lang } = use.useLang()
const messages = {
  en,
  zh
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: lang,
  messages: messages
})

export default i18n

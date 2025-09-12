const LANG = import.meta.env.VITE_APP_LANG as string

console.log('LANG:', LANG)

export const useLang = () => {
  const lang =
    LANG === 'zh'
      ? 'zh'
      : localStorage.getItem('lang') || (navigator.language.includes('zh') ? 'zh' : 'en')
  const isZh = LANG === 'zh' || lang === 'zh'
  const setLang = (lang) => {
    localStorage.setItem('lang', LANG === 'ZH' ? 'zh' : lang)
    window.location.reload()
  }
  return {
    lang,
    isZh,
    setLang
  }
}

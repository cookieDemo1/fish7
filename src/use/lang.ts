export const useLang = () => {
  console.log(localStorage.getItem('lang'))
  const lang = localStorage.getItem('lang') || (navigator.language.includes('zh') ? 'zh' : 'en')
  const isZh = lang === 'zh'
  const setLang = (lang) => {
    localStorage.setItem('lang', lang)
    window.location.reload()
  }
  return {
    lang,
    isZh,
    setLang
  }
}

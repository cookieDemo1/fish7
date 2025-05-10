import { useMainStore } from '@/store/main'

declare global {
  type FilterState<T extends string, U extends string> = T extends `${U}${string}` ? never : T

  type MainState = FilterState<
    keyof ReturnType<typeof useMainStore>,
    Lowercase<'GET' | 'POST' | 'PUT' | 'DELETE' | '$' | '_'>
  >

  type FilterAction<T extends string, U extends string> = T extends `${U}${string}` ? T : never
  type MainAction = FilterAction<
    keyof ReturnType<typeof useMainStore>,
    Lowercase<'GET' | 'POST' | 'PUT' | 'DELETE'>
  >

  interface VueComponentInput {
    props: any
    emit: any
  }

  interface Window {
    AMap: any
    Loca: any
    _AMapSecurityConfig: any
    // aMapInitCallback: Function
    // WebVideoCtrl: any
  }
}

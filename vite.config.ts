import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// import { getThemeVariables } from 'ant-design-vue/dist/theme'

const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    // Components({
    //   resolvers: [VantResolver()]
    // }),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [resolve('src/assets/svg')],
      // 指定象征符号
      symbolId: 'icon-[name]'
    }),
    legacy({
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    AutoImport({
      imports: [
        // 预先设置
        'vue',
        'vue-router',
        {
          '@/utils/PropTypes': [['default', 'PropTypes']],
          '@/utils/index': [['*', 'utils']],
          '@/utils/constant': [['*', 'constant']],
          '@/use/index': [['*', 'use']],
          '@/api/index': [['default', 'api']],
          '@/store/index': [['*', 'store']]
        }
      ],
      dts: './src/auto-imports.d.ts'
    })
  ],
  resolve: {
    // 设置别名
    alias: {
      '@': resolve('src')
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "./src/style/var.less";
          @import "./src/style/mixin.less";
        `,
        modifyVars: {
          'primary-color': '#00e4fb', // 全局主色
          'success-color': '#16ce67', // 成功色
          'warning-color': '#eca303', // 警告色
          'error-color': '#f53d2d', // 错误色
          // 'border-radius-base': '32px',

          'body-background': '#000916',
          'component-background': '#1F2839',

          'text-color': '#dae4e5', // 主文本色
          'text-color-secondary': '#b6b8bf', // 次文本色

          'border-color-base': '#39566B', // 边框色

          'btn-default-color': '#dae4e5',
          'btn-default-bg': 'rgba(255,255,255,.2)',
          'btn-default-border': '1px solid rgba(255,255,255,.2)',

          'btn-height-base': '40px',
          'border-radius-base': '2px', // 组件/浮层圆角
          'input-placeholder-color': '#9EA0A6',
          'input-icon-color': '#565761',
          'input-icon-hover-color': '#b4c1d4',

          'checkbox-check-color': '#414a58',
          'van-border-color': 'rgba(218, 228, 229, 0.25)',
          'primary-color-active': '#00E7FE',
          'primary-color-hover': '#00E7FE'
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    hmr: true,
    proxy: {
      '/api': {
        // target: 'http://172.16.14.222/',
        target: 'http://127.0.0.1:3000',
        // target: 'http://172.16.14.141:3000',
        changeOrigin: true
      }
      // '/uploads': {
      //   target: 'http://172.16.9.106:8001',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/uploads/, '')
      // }
    }
  }
})

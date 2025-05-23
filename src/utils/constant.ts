import fjIcon from '@/assets/gufengji_img@2x.png'
import fjOffline from '@/assets/status/jiansujlx_icon@2x.png'
import fjOn from '@/assets/status/luocifjkai_icon@2x.gif'
import fjOff from '@/assets/status/jiansujgb_icon@2x.png'

import xhsbIcon from '@/assets/xunhuanb_img@2x.png'
import xhsbOffline from '@/assets/status/xunhsblx_icon@2x.png'
import xhsbOn from '@/assets/status/xunhsbkai_icon@2x.gif'
import xhsbOff from '@/assets/status/xunhsbgb_icon@2x.png'

import sjdIcon from '@/assets/shajund_img@2x.png'
import sjdOffline from '@/assets/status/dengglx_icon@2x.png'
import sjdOn from '@/assets/status/denggkai_icon@2x.gif'
import sjdOff from '@/assets/status/dengggb_icon@2x.png'

import gljIcon from '@/assets/danfej_img@2x.png'
import gljOffline from '@/assets/status/kaiguanlx_icon@2x.png'
import gljOn from '@/assets/status/kaiguankai_icon@2x.png'
import gljOff from '@/assets/status/kaiguangb_icon@2x.png'

import psbIcon from '@/assets/liushuib_img@2x.png'
import psbOffline from '@/assets/status/penshuiblx_icon@2x.png'
import psbOn from '@/assets/status/penshuibkai_icon@2x.gif'
import psbOff from '@/assets/status/penshuibgb_icon@2x.png'

import dcfIcon from '@/assets/kaiguan_img@2x.png'
import dcfOffline from '@/assets/status/kaiguanlx_icon@2x.png'
import dcfOn from '@/assets/status/kaiguankai_icon@2x.png'
import dcfOff from '@/assets/status/kaiguangb_icon@2x.png'

import xsbIcon from '@/assets/gaoycxb_img@2x.png'
import kgIcon from '@/assets/kaiguan_img2@2x.png'
import kgOffline from '@/assets/status/kaiguanlx_icon@2x.png'
import kgOn from '@/assets/status/kaiguankai_icon@2x.png'
import kgOff from '@/assets/status/kaiguangb_icon@2x.png'

import fqOn from '@/assets/status/fuqiukg_kai@2x.png'
import fqOff from '@/assets/status/fuqiukg_guan@2x.png'

export const mode = import.meta.env.VITE_APP_MODE

export const imgMap1 = {
  1: {
    icon: fjIcon,
    0: fjOffline, // 0离线
    1: fjOn, // 1开
    2: fjOff, // 2关
    name: '1#罗茨风机'
  },
  2: {
    icon: fjIcon,
    0: fjOffline,
    1: fjOn,
    2: fjOff,
    name: '2#罗茨风机'
  },
  3: {
    icon: xhsbIcon,
    0: xhsbOffline,
    1: xhsbOn,
    2: xhsbOff,
    name: '循环水泵'
  },
  4: {
    icon: sjdIcon,
    0: sjdOffline,
    1: sjdOn,
    2: sjdOff,
    name: '紫外线杀菌灯'
  },
  5: {
    icon: gljIcon,
    0: gljOffline,
    1: gljOn,
    2: gljOff,
    name: '微型过滤机'
  },
  6: {
    icon: psbIcon,
    0: psbOffline,
    1: psbOn,
    2: psbOff,
    name: '微滤机喷水泵'
  },
  7: {
    icon: dcfIcon,
    0: dcfOffline,
    1: dcfOn,
    2: dcfOff,
    name: '蛋分机'
  }
}

export const imgMap2 = {
  1: {
    icon: fjIcon,
    0: xhsbOffline, // 0离线
    1: xhsbOn, // 1开
    2: xhsbOff, // 2关
    name: '回水泵',
    isFrequency: true
  },
  2: {
    icon: fjIcon,
    0: fjOffline, // 0离线
    1: fjOn, // 1开
    2: fjOff, // 2关
    name: '溶氧锥泵'
  },
  3: {
    icon: kgIcon,
    0: kgOffline, // 0离线
    1: kgOn, // 1开
    2: kgOff, // 2关
    name: '备用380V'
  },
  4: {
    icon: sjdIcon,
    0: sjdOffline, // 0离线
    1: sjdOn, // 1开
    2: sjdOff, // 2关
    name: '鱼苗训练灯'
  },
  5: {
    icon: gljIcon,
    0: gljOffline, // 0离线
    1: gljOn, // 1开
    2: gljOff, // 2关
    name: '微型过滤机'
  },
  6: {
    icon: xsbIcon,
    0: kgOffline, // 0离线
    1: kgOn, // 1开
    2: kgOff, // 2关
    name: '微滤机冲洗水泵'
  },
  7: {
    icon: dcfIcon,
    0: dcfOffline, // 0离线
    1: dcfOn, // 1开
    2: dcfOff, // 2关
    name: '电磁阀24V'
  },
  8: {
    icon: kgIcon,
    0: kgOffline, // 0离线
    1: kgOn, // 1开
    2: kgOff, // 2关
    name: '告警提示'
  },
  9: {
    icon: kgIcon,
    0: fqOff, // 0离线
    1: fqOn, // 1开
    2: kgOff, // 2关
    name: '悬浮球开关'
  }
}

console.log(mode)

export const imgMap = mode === 'mode1' ? imgMap1 : imgMap2

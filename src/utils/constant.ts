import fjIcon from '@/assets/gufengji_img@2x.png'
import fjOffline from '@/assets/status/jiansujlx_icon@2x.png'
import fjOn from '@/assets/status/luocifjkai_icon@2x.png'
import fjOff from '@/assets/status/jiansujgb_icon@2x.png'

import xhsbIcon from '@/assets/xunhuanb_img@2x.png'
import xhsbOffline from '@/assets/status/xunhsblx_icon@2x.png'
import xhsbOn from '@/assets/status/xunhsbkai_icon@2x.png'
import xhsbOff from '@/assets/status/xunhsbgb_icon@2x.png'

import sjdIcon from '@/assets/shajund_img@2x.png'
import sjdOffline from '@/assets/status/dengglx_icon@2x.png'
import sjdOn from '@/assets/status/kaiguankai_icon@2x.png'
import sjdOff from '@/assets/status/kaiguangb_icon@2x.png'

import gljIcon from '@/assets/danfej_img@2x.png'
import gljOffline from '@/assets/status/kaiguanlx_icon@2x.png'
import gljOn from '@/assets/status/kaiguankai_icon@2x.png'
import gljOff from '@/assets/status/kaiguangb_icon@2x.png'

import psbIcon from '@/assets/liushuib_img@2x.png'
import psbOffline from '@/assets/status/penshuiblx_icon@2x.png'
import psbOn from '@/assets/status/penshuibkai_icon@2x.png'
import psbOff from '@/assets/status/penshuibgb_icon@2x.png'

import dcfIcon from '@/assets/kaiguan_img@2x.png'
import dcfOffline from '@/assets/status/kaiguanlx_icon@2x.png'
import dcfOn from '@/assets/status/kaiguankai_icon@2x.png'
import dcfOff from '@/assets/status/kaiguangb_icon@2x.png'

export const imgMap = {
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
    name: '电磁阀1'
  }
}

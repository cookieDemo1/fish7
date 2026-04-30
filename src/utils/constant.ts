import fjOffline from '@/assets/status/jiansujlx_icon@2x.png'
import fjOn from '@/assets/status/luocifjkai_icon@2x.gif'
import fjOff from '@/assets/status/jiansujgb_icon@2x.png'

import xhsbOffline from '@/assets/status/xunhsblx_icon@2x.png'
import xhsbOn from '@/assets/status/xunhsbkai_icon@2x.gif'
import xhsbOff from '@/assets/status/xunhsbgb_icon@2x.png'

import lightOffline from '@/assets/status/dengglx_icon@2x.png'
import lightOn from '@/assets/status/denggkai_icon@2x.gif'
import lightOff from '@/assets/status/dengggb_icon@2x.png'

import psbOffline from '@/assets/status/penshuiblx_icon@2x.png'
import psbOn from '@/assets/status/penshuibkai_icon@2x.gif'
import psbOff from '@/assets/status/penshuibgb_icon@2x.png'

import djOffline from '@/assets/status/dianjilx_icon@2x.png'
import djOn from '@/assets/status/dianjikai_icon@2x.png'
import djOff from '@/assets/status/dianjigb_icon@2x.png'

import kgOffline from '@/assets/status/kaiguanlx_icon@2x.png'
import kgOn from '@/assets/status/kaiguankai_icon@2x.png'
import kgOff from '@/assets/status/kaiguangb_icon@2x.png'

import fqOn from '@/assets/status/fuqiukg_kai@2x.png'
import fqOff from '@/assets/status/fuqiukg_guan@2x.png'

export const imgMap = {
  1: {
    0: fjOffline, // 0离线
    1: fjOn, // 1开
    2: fjOff // 2关
  },
  2: {
    0: kgOffline,
    1: kgOn,
    2: kgOff
  },
  3: {
    0: lightOffline,
    1: lightOn,
    2: lightOff
  },
  4: {
    0: xhsbOffline,
    1: xhsbOn,
    2: xhsbOff
  },
  5: {
    0: djOffline,
    1: djOn,
    2: djOff
  },
  6: {
    0: kgOffline,
    1: kgOn,
    2: kgOff
  },
  7: {
    0: kgOffline,
    1: kgOn,
    2: kgOff
  },
  8: {
    0: kgOffline,
    1: kgOn,
    2: kgOff
  },
  9: {
    0: kgOffline,
    1: kgOn,
    2: kgOff
  },
  10: {
    0: fqOff,
    1: fqOn,
    2: fqOff
  }
}

export const sensorMap = [
  { name: 'Dissolved oxygen', unit: 'mg/L', key: 'oxygen', value: '--', show: false },
  { name: 'Dissolved oxygen1', unit: 'mg/L', key: 'oxygen1', value: '--', show: false },
  { name: 'Dissolved oxygen2', unit: 'mg/L', key: 'oxygen2', value: '--', show: false },

  { name: 'Water temperature', unit: '℃', key: 'temp', value: '--', show: false },
  { name: 'Water temperature1', unit: '℃', key: 'temp1', value: '--', show: false },
  { name: 'Water temperature2', unit: '℃', key: 'temp2', value: '--', show: false },

  { name: 'PH Text', unit: 'PH', key: 'ph', value: '--', show: false },
  { name: 'PH1', unit: 'PH', key: 'ph1', value: '--', show: false },
  { name: 'PH2', unit: 'PH', key: 'ph2', value: '--', show: false },

  { name: 'ORP1', unit: 'mV', key: 'orp1', value: '--', show: false },
  { name: 'ORP2', unit: 'mV', key: 'orp2', value: '--', show: false },

  { name: 'Liquid level', unit: 'm', key: 'level', value: '--', show: false },
  { name: 'Salinity', unit: 'PSU', key: 's', value: '--', show: false },
  { name: 'Nitrite', unit: 'mg/L', key: 'no2', value: '--', show: false },
  { name: 'Ammonia Nitrogen', unit: 'mg/L', key: 'andan', value: '--', show: false },
  { name: 'Ozone', unit: 'mg/L', key: 'ozone', value: '--', show: false },
  { name: 'COD', unit: 'mg/L', key: 'cod', value: '--', show: false },
  { name: 'BOD', unit: 'mg/L', key: 'bod', value: '--', show: false },
  { name: 'Turbidity', unit: 'NTU', key: 'tur', value: '--', show: false }
]

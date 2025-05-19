import type { App } from 'vue'

import { Button, Field, Form, CellGroup, Col, Row, Picker, DatePicker } from 'vant'

const setupVant = (app: App) => {
  app.use(Button)
  app.use(Field)
  app.use(Form)
  app.use(CellGroup)
  app.use(Col)
  app.use(Row)
  app.use(Picker)
  app.use(DatePicker)
}

export default setupVant

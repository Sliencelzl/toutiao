import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import 'vant/lib/index.css' //引入vant组件样式表
import 'amfe-flexible'//加载动态设置rem的基准值
import './Utils/dayjs'
import {
  Button, NavBar, Tab, Tabs, Form, Field, CellGroup, Toast, CountDown, Tabbar,
  TabbarItem, Image as VanImage, Grid, GridItem, Cell, Dialog, List, PullRefresh,
  Popup,Icon, Search ,Loading ,Divider,ImagePreview,Picker,DatetimePicker   
} from 'vant'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(CellGroup)
Vue.use(Toast)
Vue.use(CountDown)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(VanImage)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Cell)
Vue.use(Dialog)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(Popup)
Vue.use(Icon)
Vue.use(Search)
Vue.use(Loading)
Vue.use(Divider)
Vue.use(ImagePreview)
Vue.use(Picker)
Vue.use(DatetimePicker)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

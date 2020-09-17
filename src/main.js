// console.log(1212313);
// document.write(`<a>1231231</a>`)

import Vue from 'vue';
import App from './App.vue'
import { createRouter } from './router';
// base library
import {
    ConfigProvider,
    Layout,
    Input,
    InputNumber,
    Button,
    Switch,
    Radio,
    Checkbox,
    Select,
    Card,
    Form,
    Row,
    Col,
    Modal,
    Table,
    Tabs,
    Icon,
    Badge,
    Popover,
    Dropdown,
    List,
    Avatar,
    Breadcrumb,
    Steps,
    Spin,
    Menu,
    Drawer,
    Tooltip,
    Alert,
    Tag,
    Divider,
    DatePicker,
    TimePicker,
    Upload,
    Progress,
    Skeleton,
    Popconfirm,
    PageHeader,
    Result,
    Statistic,
    Descriptions,
    message,
    notification,
    FormModel
  } from 'ant-design-vue';
import { createStore } from './store/index';
  // import proLayout from '@ant-design-vue/pro-layout'
  // Vue.use(proLayout)
  Vue.use(ConfigProvider)
  Vue.use(Layout)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Button)
  Vue.use(Switch)
  Vue.use(Radio)
  Vue.use(Checkbox)
  Vue.use(Select)
  Vue.use(Card)
  Vue.use(Form)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Modal)
  Vue.use(Table)
  Vue.use(Tabs)
  Vue.use(Icon)
  Vue.use(Badge)
  Vue.use(Popover)
  Vue.use(Dropdown)
  Vue.use(List)
  Vue.use(Avatar)
  Vue.use(Breadcrumb)
  Vue.use(Steps)
  Vue.use(Spin)
  Vue.use(Menu)
  Vue.use(Drawer)
  Vue.use(Tooltip)
  Vue.use(Alert)
  Vue.use(Tag)
  Vue.use(Divider)
  Vue.use(DatePicker)
  Vue.use(TimePicker)
  Vue.use(Upload)
  Vue.use(Progress)
  Vue.use(Skeleton)
  Vue.use(Popconfirm)
  Vue.use(PageHeader)
  Vue.use(Result)
  Vue.use(Statistic)
  Vue.use(Descriptions)
  Vue.use(FormModel)
  Vue.use(FormModel.Item)
  
  Vue.config.productionTip = false;
  const store = createStore();
  const router = createRouter(store);

  new Vue({
      store,
      router,
      render: h => h(App)
  }).$mount('#app')
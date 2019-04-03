/* eslint-disable handle-callback-err */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../theme/index.css'
import 'font-awesome/scss/font-awesome.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './store'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

process.env.Mock && require('./mock/index')

axios.defaults.baseURL = process.env.HOST + '/'
axios.defaults.headers = {
    'Accept': 'Application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
}
axios.defaults.timeout = 10000
axios.defaults.crossDomain = true
axios.interceptors.response.use((res) => {
    // do nothing
    return res
}, (err) => {
    // 出现在这里的错误，一般是 http 错误，例如服务器 500，未授权 401
    // 401 最常见，gante 的后端，所有的业务逻辑错误返回的都是 200
    // 因此，在这里出现 401 或其他 http error 时，直接退出登录
    // 因为，上线后，出现最常见的错误就是 401，出现 401 是因为用户在其他地方登录了，服务端的 token 发生改变
    // 而 axios 无法 catch 跨域的 http 异常状态 code: error.response.status，只能知道发生异常
    localStorage.removeItem('api_token')
    // window.location.href = process.env.BASE_PATH + '/#/login'
})

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueQuillEditor) // 这个需要单独加载，否则无法加载 Quill editor

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})

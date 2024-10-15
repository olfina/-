import { createStore } from 'vuex'
// import ModuleLogin from './modules/login1.js'
import Login from './modules/Login'
import Head from './modules/Head'
import User from './modules/User'

export default createStore({
  // ...ModuleLogin,
  modules: {
    Login,
    Head,
    User
  }
})

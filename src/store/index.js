import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import team from './modules/team'
import project from './modules/project'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        team,
        project,
        task
    },
    strict: process.env.NODE_ENV !== 'production'
})

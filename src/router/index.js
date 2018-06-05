import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Projects from '@/components/Projects'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})

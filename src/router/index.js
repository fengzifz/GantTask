import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Projects from '@/components/Projects'
import ProjectDetails from '@/components/ProjectDetails'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/project/details',
            name: 'ProjectDetails',
            component: ProjectDetails
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

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Projects from '@/components/Projects'
import ProjectTasks from '@/components/ProjectTasks'
import ProjectSettings from '@/components/ProjectSettings'
import ProjectMembers from '@/components/ProjectMembers'
import MemberSettings from '@/components/MemberSettings'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/project/tasks',
            name: 'ProjectTasks',
            component: ProjectTasks
        },
        {
            path: '/project/tasks/settings',
            name: 'ProjectSettings',
            component: ProjectSettings
        },
        {
            path: '/project/tasks/members',
            name: 'ProjectMembers',
            component: ProjectMembers
        },
        {
            path: '/member/settings',
            name: 'MemberSettings',
            component: MemberSettings
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

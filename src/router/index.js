import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Projects from '@/components/Projects'
import ProjectTasks from '@/components/ProjectTasks'
import ProjectSettings from '@/components/ProjectSettings'
import ProjectMembers from '@/components/ProjectMembers'
import MemberSettings from '@/components/MemberSettings'
import ProjectTaskDetails from '@/components/ProjectTaskDetails'
import ProjectGant from '@/components/ProjectGant'

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
            path: '/project/tasks/pro_gant',
            name: 'ProjectGant',
            component: ProjectGant
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
            path: '/project/tasks/details',
            name: 'ProjectTaskDetails',
            component: ProjectTaskDetails
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

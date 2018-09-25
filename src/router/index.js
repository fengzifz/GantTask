import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Projects from '@/components/Projects'
import Task from '@/components/Task'
import ProjectSettings from '@/components/ProjectSettings'
import ProjectMembers from '@/components/ProjectMembers'
import MemberSettings from '@/components/MemberSettings'
import TaskDetails from '@/components/TaskDetails'
import TaskCompleted from '@/components/TaskCompleted'
import GantChart from '@/components/GantChart'
import Team from '@/components/Team'
import PersonalSettings from '@/components/PersonalSettings'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'
import Register from '@/components/Register'
import TeamSettings from '@/components/TeamSettings'
import Join from '@/components/Join'
import InviteMembers from '@/components/InviteMembers'
import MemberManages from '@/components/MemberManages'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/team',
            name: 'Team',
            component: Team
        },
        {
            path: '/project/tasks',
            name: 'Task',
            component: Task
        },
        {
            path: '/project/tasks/gant',
            name: 'GantChart',
            component: GantChart
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
            path: '/project/tasks/details/:id',
            name: 'TaskDetails',
            component: TaskDetails
        },
        {
            path: '/project/tasks/completed',
            name: 'TaskCompleted',
            component: TaskCompleted
        },
        {
            path: '/member/settings',
            name: 'MemberSettings',
            component: MemberSettings
        },
        {
            path: '/personal/settings',
            name: 'PersonalSettings',
            component: PersonalSettings
        },
        {
            path: '/forgot_password',
            name: 'ForgotPassword',
            component: ForgotPassword
        },
        {
            path: '/reset_password/:id',
            name: 'ResetPassword',
            component: ResetPassword
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/team_settings',
            name: 'TeamSettings',
            component: TeamSettings
        },
        {
            path: '/join/:id/:name/:email/:flag',
            name: 'Join',
            component: Join
        },
        {
            path: '/invite_members',
            name: 'InviteMembers',
            component: InviteMembers
        },
        {
            path: '/member/manages',
            name: 'MemberManages',
            component: MemberManages
        }

    ]
})

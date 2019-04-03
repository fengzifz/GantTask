
// 引入 mock
const Mock = require('mockjs')
const Random = Mock.Random

// login
Mock.mock('/user/login', 'post', function () {
    return {
        error: 0,
        message: '登录成功',
        data: {
            api_token: Random.string(16),
            user_id: 1,
            name: Random.cname(),
            avatar: '/static/n.png'
        }
    }
})

// get teams
Mock.mock(RegExp('/team/get_user_teams' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: [
            {id: 1, name: '前端小组'},
            {id: 2, name: '后端小组'},
            {id: 3, name: '设计组'}
        ]
    }
})

// Create a team
Mock.mock('/team/create', 'post', function () {
    return {
        error: 0,
        message: '成功',
        data: {id: 4, name: '测试小组'}
    }
})

// get all projects
Mock.mock(RegExp('/project/get_all' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: [
            {id: 1, name: '官网 UI 图', description: '设计 UI 图'},
            {id: 2, name: '消息系统开发', description: ''},
            {id: 3, name: 'RabbitMQ 研究', description: '用于重构业务'}
        ]
    }
})

// get all tasks
Mock.mock(RegExp('/task/get_tasks' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: [
            {id: 1, name: '完善 OAuth 登录', executor: 'Damon', executor_id: 1, start: '2019-04-01', end: '2019-04-30', description: ''},
            {id: 2, name: '优化队列阻塞的问题', executor: 'Lisa', executor_id: 2, start: '2019-04-01', end: '2019-04-30', description: ''},
            {id: 3, name: '修复 session id 为空的问题', executor_id: 1, start: '2019-04-01', end: '2019-04-30', description: ''}
        ]
    }
})

// get members
Mock.mock(RegExp('/project/get_members' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: [
            {id: 1, name: 'Damon'},
            {id: 2, name: 'Lisa'},
            {id: 3, name: 'Lucy'},
            {id: 4, name: 'Tom'}
        ]
    }
})

// get completed tasks
Mock.mock(RegExp('/task/get_completed' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: [
            {id: 4, name: '开发登录/注册功能', status: 1, executor: 'Damon', executor_id: 1, start: '2019-04-01', end: '2019-04-30', description: ''},
            {id: 5, name: '配置 CI/CD', status: 1, executor: 'Lisa', executor_id: 2, start: '2019-04-01', end: '2019-04-30', description: ''},
            {id: 6, name: '编写数据库规格说明书', status: 1, start: '2019-04-01', end: '2019-04-30', description: ''}
        ]
    }
})

// get team members
Mock.mock(RegExp('/team/get_team_users' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: [
            {id: 1, name: 'Damon'},
            {id: 2, name: 'Tom'},
            {id: 3, name: 'Mary'}
        ]
    }
})

// create a task
Mock.mock('/task/create', 'post', function () {
    return {
        error: 0,
        message: '创建任务成功',
        data: {
            id: 100,
            name: '修改队列最大尝试次数',
            executor_id: 1,
            executor: 'Damon',
            start: '2019-05-01',
            end: '2019-06-01'
        }
    }
})

// Update task progress
Mock.mock('/task/update_general', 'post', function () {
    return {
        error: 0,
        message: '更新任务进度成功',
        data: {
            executor_id: 1,
            executor: 'Damon',
            progress: 45
        }
    }
})

// Get a task details
Mock.mock(RegExp('/task/get' + '.*'), 'get', function () {
    return {
        error: 0,
        message: '成功',
        data: {
            executor_id: 1,
            executor: 'Damon',
            description: '测试的任务描述',
            name: '完善后台图片管理'
        }
    }
})

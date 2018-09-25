<template>
    <el-main class="el-main-auto-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div class="new-task-wrap" v-if="isAddingTask">
            <el-row
                element-loading-spinner="el-icon-loading"
                v-loading="addTaskLoading">
                <el-col :span="8">
                    <!-- 新任务 Start -->
                    <el-form v-model="newTask" size="small">
                        <el-form-item>
                            <el-row :gutter="15">
                                <el-col :span="20">
                                    <el-input v-model="newTask.name" placeholder="请输入任务名称" />
                                </el-col>
                                <el-col :span="4">
                                    <el-popover
                                        placement="bottom"
                                        width="160"
                                        class="member-popover"
                                        v-model="memberVisible">
                                        <el-select size="mini" placeholder="选择成员" @change="selectExecutor" v-model="newTask.executor_id" >
                                            <el-option class="item-member"
                                                       v-for="pm in projectMembers"
                                                       :key="pm.id"
                                                       :value="pm.id"
                                                       :label="pm.name">
                                                {{ pm.name }}
                                            </el-option>
                                        </el-select>
                                        <div class="task-date task-start">
                                            <el-date-picker
                                                v-model="newTask.start"
                                                type="date"
                                                size="mini"
                                                @change="updateNewTaskStart"
                                                placeholder="开始"
                                                format="yyyy-MM-dd">
                                            </el-date-picker>
                                        </div>
                                        <div class="task-date task-end">
                                            <el-date-picker
                                                v-model="newTask.end"
                                                type="date"
                                                size="mini"
                                                @change="updateNewTaskEnd"
                                                placeholder="结束"
                                                format="yyyy-MM-dd">
                                            </el-date-picker>
                                        </div>
                                        <el-button type="text" size="small" slot="reference">
                                            {{ newTask.executor || '未指派' }} , {{ newTask.start || '开始' }} 至 {{ newTask.end || '结束' }}
                                        </el-button>
                                    </el-popover>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item style="margin-bottom: 0;">
                            <el-button @click="cancelNewTask">取消</el-button>
                            <el-button type="primary" @click="addNewTask">确定</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 新任务 End -->
                </el-col>
            </el-row>
        </div>
        <div class="gant-details">
            <el-row :gutter="10">
                <el-col :span="6">
                    <div class="gant-tasks">
                        <div class="tasks-header">
                            <span>任务列表</span> |
                            <el-button type="text" @click="changeView('Day')">按日</el-button> |
                            <el-button type="text" @click="changeView('Month')">按月</el-button> |
                            <el-button type="text" @click="showAddTask"><i class="fa fa-plus-square"></i></el-button>
                        </div>
                        <div :title="item.name + '(' + (item.executor || '未指派') + ')'"
                             v-for="(item, index) in tasks"
                             :key="index"
                             :id="'task-item-' + item.id"
                             :class="{'fill-bg': (index % 2 !== 0), 'task-item': true}">
                            <el-checkbox
                                @change="updateTaskStatus($event, item.id, index)"
                                :value="item.status === 1" />
                            <el-popover
                                placement="right"
                                width="160"
                                @hide="updateTask(item, index)"
                                trigger="click">
                                <el-select size="mini" placeholder="选择成员" v-model="currentTask.executor_id" >
                                    <el-option class="item-member"
                                               v-for="pm in projectMembers"
                                               :key="pm.id"
                                               :value="pm.id"
                                               :label="pm.name">
                                        {{ pm.name }}
                                    </el-option>
                                </el-select>
                                <div class="task-progress">
                                    <el-input size="mini" v-model="currentTask.progress">
                                        <template slot="append">%</template>
                                    </el-input>
                                </div>
                                <el-button type="text"
                                           @click="showAssignment(item.executor_id, item.progress)"
                                           class="task-name"
                                           slot="reference">
                                    {{ item.name }} ({{ item.executor || '未指派'}})
                                </el-button>
                            </el-popover>
                        </div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="gant-target"></div>
                </el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script>
/* eslint-disable no-new */
import Gantt from 'frappe-gantt'
import {mapState} from 'vuex'
import axios from 'axios'
import {Loading} from 'element-ui'
export default {
    name: 'GantChart',
    data () {
        return {
            tasks: [],
            newTask: {name: '', start: '', end: '', executor_id: '', executor: '', progress: 0},
            currentTask: {executor_id: '', progress: 0},
            gant: {},
            projectMembers: [],
            memberVisible: false,
            addTaskLoading: false,
            loading: false,
            isEditExecutor: false
        }
    },
    computed: {
        ...mapState({
            teamId: state => state.team.currentTeamId,
            projectId: state => state.project.currentProjectId,
            apiToken: state => state.user.apiToken,
            isAddingTask: state => state.task.isAddingTask
        })
    },
    created: function () {
        this.getTasks()
        this.getMembers()
    },
    updated: function () {
        let self = this
        this.gant = new Gantt('.gant-target', this.tasks, {
            on_date_change: function (task, start, end) {
                // 日期改变时触发
                let s = new Date(start)
                let e = new Date(end)
                let startString = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate()
                let endString = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate()
                axios.post('task/update_date', {
                    team_id: self.teamId,
                    project_id: self.projectId,
                    api_token: self.apiToken,
                    id: task.id,
                    start: startString,
                    end: endString
                }).then(res => {
                    if (res.data.error) {
                        self.$message.error(res.data.message)
                    } else {
                        // TODO: 拉动甘特图修改日期时，不需要重新渲染视图，否则影响用户体验，以下代码暂时注释
                        // let len = self.tasks.length
                        // let allTasks = self.tasks
                        // let updatedIndex
                        // let updatedTask = task
                        // for (let i = 0; i < len; i++) {
                        //     if (allTasks[i]['id'] === task.id) {
                        //         updatedIndex = i
                        //         updatedTask.start = res.data.data.start
                        //         updatedTask.end = res.data.data.end
                        //     }
                        // }
                        // self.tasks.splice(updatedIndex, 1, updatedTask)
                        // 这里是使用非变异方法来更新 this.tasks 的数据
                        self.tasks.filter(function (item, index) {
                            if (item.id === task.id) {
                                self.tasks[index]['start'] = res.data.data.start
                                self.tasks[index]['end'] = res.data.data.end
                            }
                        })
                    }
                })
            },
            on_progress_change: function (task, progress) {
                // 进度改变时触发
                let loading = Loading.service({
                    target: '#task-item-' + task.id,
                    spinner: 'el-icon-loading'
                })
                axios.post('task/update_progress', {
                    api_token: self.apiToken,
                    team_id: self.teamId,
                    project_id: self.projectId,
                    id: task.id,
                    progress: progress
                }).then(res => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        // TODO: 这里是一个比较笨的更新 view 的方法，可以优化
                        let progressUpdate = res.data.data.progress
                        let len = self.tasks.length
                        let allTasks = self.tasks
                        let updatedIndex
                        let updatedTask = task
                        for (let i = 0; i < len; i++) {
                            if (allTasks[i]['id'] === task.id) {
                                updatedIndex = i
                                updatedTask.progress = progressUpdate
                            }
                        }
                        self.tasks.splice(updatedIndex, 1, updatedTask)
                    }
                    loading.close()
                })
            }
        })
        let type = localStorage.getItem('gantView') || 'Day'
        this.gant.change_view_mode(type)
    },
    methods: {
        updateTask: function (task, index) {
            let tid = task.id
            let executorId = this.currentTask.executor_id
            let progress = this.currentTask.progress
            // 任务原来的信息: 执行者 id、进度
            let oldProgress = task.progress
            let oldExecutorId = task.executor_id
            // 如果任务的信息没有修改，不需要和服务器通信
            if (executorId === oldExecutorId && oldProgress === progress) {
                return
            }
            // loading 效果
            let loading = Loading.service({
                target: '#task-item-' + tid,
                spinner: 'el-icon-loading'
            })
            axios.post('task/update_general', {
                api_token: this.apiToken,
                executor_id: executorId,
                progress: progress,
                team_id: this.teamId,
                project_id: this.projectId,
                id: tid
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    let task = this.tasks[index]
                    task.progress = res.data.data.progress
                    task.executor_id = res.data.data.executor_id
                    task.executor = res.data.data.executor
                    this.tasks.splice(index, 1, task)
                }
                loading.close()
            })
        },
        showAssignment: function (userId, progress) {
            this.currentTask.executor_id = userId
            this.currentTask.progress = progress
        },
        updateTaskStatus: function (isCompleted, tid, index) {
            let loading = Loading.service({
                target: '#task-item-' + tid,
                spinner: 'el-icon-loading'
            })
            let status = isCompleted ? 1 : 0
            // 更新任务状态
            axios.post('task/update_status', {
                api_token: this.apiToken,
                team_id: this.teamId,
                project_id: this.projectId,
                id: tid,
                status: status
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    // 任务完成，进度也需要变成 100%
                    let task = this.tasks[index]
                    task.status = res.data.data.status
                    task.progress = res.data.data.progress
                    this.tasks.splice(index, 1, task)
                }
                loading.close()
            })
        },
        showAddTask: function () {
            // 显示添加任务的 html
            this.$store.dispatch('task/displayAddingTask', true)
        },
        changeView: function (type) {
            // 改变甘特图的视图
            this.gant.change_view_mode(type)
            localStorage.setItem('gantView', type)
        },
        getMembers: function () {
            // 获取项目的所有成员
            axios.get('project/get_members?api_token=' + this.apiToken +
                '&project_id=' + this.projectId + '&team_id=' + this.TeamId)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        this.projectMembers = res.data.data
                    }
                })
        },
        getTasks: function () {
            // 获取所有任务
            this.loading = true
            axios.get('task/get_tasks?api_token=' + this.apiToken + '&team_id=' + this.teamId +
            '&project_id=' + this.projectId).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    let date = new Date()
                    let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                    let today2 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1)
                    this.tasks = res.data.data.filter((item, index) => {
                        let task = item
                        task.id = item.id.toString()
                        // Set a default date, otherwise gantt-chart will occur an error
                        if (!item.start || !item.end) {
                            task.start = today
                            task.end = today2
                        }
                        return task
                    })
                }
                this.loading = false
            })
        },
        updateNewTaskStart: function (value) {
            // 更新新任务的开始时间
            let startDate = ''
            if (value) {
                let start = new Date(value)
                startDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
            }
            this.newTask.start = startDate
        },
        updateNewTaskEnd: function (value) {
            // 更新新任务的结束时间
            let endDate = ''
            if (value) {
                let end = new Date(value)
                endDate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
            }
            this.newTask.end = endDate
        },
        selectExecutor: function (value) {
            // 新任务 - 选择执行者
            let selected = this.projectMembers.filter((item, index) => {
                return item.id === value
            })
            this.newTask.executor = (selected[0]).name
        },
        cancelNewTask: function () {
            // 隐藏新任务填写框
            this.$store.dispatch('task/displayAddingTask', false)
        },
        addNewTask: function () {
            // 添加新任务
            this.addTaskLoading = true
            axios.post('task/create', {
                project_id: this.projectId,
                team_id: this.teamId,
                name: this.newTask.name,
                start: this.newTask.start,
                end: this.newTask.end,
                executor_id: this.newTask.executor_id,
                api_token: this.apiToken,
                progress: this.newTask.progress
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.tasks.push(res.data.data)
                    this.newTask = {name: '', start: '', end: '', executor_id: '', executor: ''}
                }
                this.addTaskLoading = false
            })
        }
    }
}
</script>

<style scoped>
    .gant-details {
        background-color: transparent;
    }
    .gant-tasks {
        background-color: #fff;
    }
    .task-item {
        height: 36px;
        font-size: 14px;
        padding-left: 15px;
        border-bottom: 2px solid #F5F7F8;
        line-height: 38px;
    }
    .tasks-header {
        height: 59px;
        padding-left: 15px;
        line-height: 60px;
        border-bottom: 2px solid #E9E9E9;
    }
    .details-container {
        width: 200px;
    }
    .fill-bg {
        background-color: #f5f5f5;
    }
    .new-task-wrap {
        padding: 15px;
        background-color: #fff;
        margin-bottom: 15px;
    }
    .task-date .el-date-editor {
        width: 100%;
        margin-top: 5px;
        border-bottom: none;
    }
    .task-name {
        color: #000;
        font-weight: 300;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 90%;
        text-align: left;
    }
    .task-name:hover {
        color: #8FBC8F;
    }
    .task-progress {
        margin-top: 5px;
    }
</style>

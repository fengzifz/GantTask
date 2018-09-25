<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="task-list">
            <el-row>
                <el-col :span="12">
                    <h2 class="title">
                        <i class="fa fa-th-large"></i>&nbsp;&nbsp;{{ currentProjectName }}
                        <el-button type="text" @click="showAddTask">添加任务</el-button>
                    </h2>
                </el-col>
                <el-col :span="12" align="right">
                    <div class="header-operation">
                        <el-button @click="goToGant" type="text">甘特图</el-button>&nbsp;&nbsp;|&nbsp;&nbsp;<el-button @click="goToMembers" type="text">项目成员</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row class="task-list">
                <el-col v-loading="addTaskLoading"
                        element-loading-spinner="el-icon-loading"
                        v-if="isAddingTask"
                        class="task-item adding-task"
                        :span="24">
                    <el-row>
                        <el-col :span="9">
                            <!-- 新任务 Start -->
                            <el-form v-model="newTask" size="small">
                                <el-form-item>
                                    <el-row :gutter="15">
                                        <el-col :span="19">
                                            <el-input size="large" v-model="newTask.name" placeholder="请输入任务名称" />
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
                                                <el-button type="text" size="large" slot="reference">
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
                </el-col>
                <el-col class="line" v-if="isAddingTask" :span="24"></el-col>
                <el-col class="task-item" :span="24" v-for="(task, index) in tasks" :key="task.id" v-model="freshArr">
                    <!-- 任务列表 Start -->
                    <el-checkbox
                        v-if="visArr['edit' + index] !== true"
                        @change="completedTask($event, task.id, index, task.executor_id, task.end)"
                        :checked="task.status === 1"
                        class="task-check"/>
                    <router-link :to="'/project/tasks/details/' + task.id" v-if="!visArr['edit' + index]">
                        <span class="task-name">{{ task.name }}</span>
                        <i style="font-size: 0.7rem;" v-if="task.description" class="fa fa-align-left"></i>
                    </router-link>
                    <el-tag size="mini" type="info" v-if="!visArr['edit' + index]" class="task-in-charge">
                        <el-popover class="task-popover"
                            placement="right"
                            width="160"
                            @hide="updateTask(task, index)"
                            click="click">
                            <el-select size="mini" placeholder="选择成员" v-model="currentTask.executor_id" >
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
                                    v-model="currentTask.start"
                                    type="date"
                                    size="mini"
                                    placeholder="开始"
                                    format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <div class="task-date task-end">
                                <el-date-picker
                                    v-model="currentTask.end"
                                    type="date"
                                    size="mini"
                                    placeholder="结束"
                                    format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                            <!--<el-button v-loading="assignLoading" style="margin-top: 5px;" type="primary" size="mini" @click="updateTask(task.id, index)">确定</el-button>-->
                            <el-button @click="showAssignment(task.executor_id, task.start, task.end)"
                                       type="text"
                                       slot="reference">
                                {{ task.executor || '未指派' }}
                                <span v-if="task.start && task.end">
                                 , {{ (new Date(task.end).getMonth() + 1) + '月' + new Date(task.end).getDate() + '日' }}
                            </span>
                            </el-button>
                        </el-popover>
                    </el-tag>
                    <el-button type="text"
                               class="task-name-edit"
                               @click="editTaskName(index)"
                               v-if="!visArr['edit' + index]">
                        <i class="fa fa-edit"></i>
                    </el-button>
                    <el-form :inline="true" v-if="visArr['edit' + index]">
                        <el-form-item>
                            <el-input style="width: 300px;" size="small" :value="task.name" :id="'task-' + task.id" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="finishEditTaskName(index, 'yes', task.id)">确定</el-button>
                            <el-button size="mini" @click="finishEditTaskName(index, 'no', null)">取消</el-button>
                        </el-form-item>
                    </el-form>
                    <!-- 任务列表 End -->
                </el-col>
                <el-col class="task-item" :span="24">
                    <router-link class="completed-task" :to="'/project/tasks/completed'">已完成任务</router-link>
                </el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
import router from '../router/index'
export default {
    name: 'Task',
    data () {
        return {
            checked: true,
            newTaskVisible: false,
            curMemberVisible: false,
            newTask: {name: '', start: '', end: '', executor_id: '', executor: ''},
            currentTask: {executor_id: '', start: '', end: '', executor: ''},
            loading: false,
            assignLoading: false,
            memberVisible: false,
            addTaskLoading: false,
            visible2: false,
            projectMembers: [],
            visArr: {},
            freshArr: []
        }
    },
    computed: {
        ...mapState({
            tasks: state => state.task.tasks,
            apiToken: state => state.user.apiToken,
            currentTeamId: state => state.team.currentTeamId,
            currentProjectId: state => state.project.currentProjectId,
            currentProjectName: state => state.project.currentProjectName,
            isAddingTask: state => state.task.isAddingTask,
            userId: state => state.user.userId
        })
    },
    created: function () {
        this.getMembers()
        this.getUnfinishedTasks()
    },
    methods: {
        finishEditTaskName: function (index, type, id) {
            this.freshArr.splice(index, 1)
            this.visArr['edit' + index] = false
            if (type === 'no') {
                return false
            }
            this.loading = true
            let name = document.getElementById('task-' + id).value
            axios.post('task/edit', {
                api_token: this.apiToken,
                project_id: this.currentProjectId,
                team_id: this.currentTeamId,
                id: id,
                name: name
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$store.dispatch('task/updateTaskName', {index: index, name: name})
                    this.loading = false
                }
            })
        },
        editTaskName: function (index) {
            this.freshArr.push(index)
            this.visArr['edit' + index] = true
        },
        goToMembers: function () {
            router.push('/project/tasks/members')
        },
        goToGant: function () {
            router.push('/project/tasks/gant')
        },
        completedTask: function (isCompleted, tid, index, eid, endDate) {
            // tid - task id, index 索引值, eid - executor id
            // 完成任务
            let status = isCompleted ? 1 : 0
            let data = {
                api_token: this.apiToken,
                status: status,
                id: tid,
                project_id: this.currentProjectId,
                team_id: this.currentTeamId
            }
            // 如果该任务未指派，或者是被其他人勾选完成，则完成任务者属于操作的人
            if (!eid || eid !== this.userId) {
                data.executor_id = this.userId
            }
            // 如果该任务未设置开始和结束时间，被勾选完成时，默认开始结束时间是当前的时间
            if (!endDate) {
                let now = new Date()
                let year = now.getFullYear()
                let month = now.getMonth() + 1
                let day = now.getDate()
                let date = year + '-' + month + '-' + day
                data.start = date
                data.end = date
            }
            axios.post('task/update_status', data).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$store.dispatch('task/updateTaskStatus', {data: res.data.data, index: index})
                }
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
        showAddTask: function () {
            // 弹出新任务填写框
            this.$store.dispatch('task/displayAddingTask', true)
        },
        cancelNewTask: function () {
            // 隐藏新任务填写框
            this.$store.dispatch('task/displayAddingTask', false)
        },
        updateTask: function (task, index) {
            // 更新任务
            // 获取最新的日期信息
            let startDate = ''
            let endDate = ''
            if (this.currentTask.start && this.currentTask.start !== '' &&
                this.currentTask.end && this.currentTask.end !== '') {
                let start = new Date(this.currentTask.start)
                let end = new Date(this.currentTask.end)
                startDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
                endDate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
            }
            // 任务原来的信息
            let oldStart = task.start
            let oldEnd = task.end
            let oldExecutorId = task.executor_id
            let oldStartDate = ''
            let oldEndDate = ''
            if (oldStart && oldEnd) {
                let start = new Date(oldStart)
                let end = new Date(oldEnd)
                oldStartDate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate()
                oldEndDate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate()
            }
            // 当任务信息 (执行者、开始日期、结束日期) 没有被修改时，不需要更新任务
            if (oldStartDate === startDate && oldEndDate === endDate && oldExecutorId === this.currentTask.executor_id) {
                return
            }
            axios.post('task/assign', {
                team_id: this.currentTeamId,
                project_id: this.currentProjectId,
                id: task.id,
                executor_id: this.currentTask.executor_id,
                start: startDate,
                end: endDate,
                api_token: this.apiToken
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('task/updateTaskExecutor', {data: res.data.data, index: index})
                    this.$store.dispatch('task/updateTaskDate', {data: res.data.data, index: index})
                }
            })
        },
        showAssignment: function (userId, start, end) {
            // 弹出任务列表的分配框
            this.currentTask.executor_id = userId
            this.currentTask.start = start
            this.currentTask.end = end
        },
        getUnfinishedTasks: function () {
            // 获取项目所有未标记完成的任务
            this.loading = true
            let pid = this.currentProjectId
            let tid = this.currentTeamId
            axios.get('task/get_tasks?api_token=' + this.apiToken + '&project_id=' + pid + '&team_id=' + tid).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$store.dispatch('task/setTasks', res.data.data)
                }
                this.loading = false
            })
        },
        getMembers: function () {
            // 获取项目的所有成员
            axios.get('project/get_members?api_token=' + this.apiToken +
                '&project_id=' + this.currentProjectId + '&team_id=' + this.currentTeamId)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        this.projectMembers = res.data.data
                    }
                })
        },
        addNewTask: function () {
            // 添加新任务
            this.addTaskLoading = true
            axios.post('task/create', {
                project_id: this.currentProjectId,
                team_id: this.currentTeamId,
                name: this.newTask.name,
                start: this.newTask.start,
                end: this.newTask.end,
                executor_id: this.newTask.executor_id,
                api_token: this.apiToken
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    let task = res.data.data
                    task.executor = this.newTask.executor
                    this.$store.dispatch('task/addTask', task)
                    this.newTask = {name: '', start: '', end: '', executor_id: '', executor: ''}
                }
                this.addTaskLoading = false
            })
        }
    }
}
</script>

<style scoped>
    #project-details .desc {
        font-size: 11px;
        color: #bfbfbf;
    }
    .task-name {
        font-size: 14px;
        padding-left: 8px;
    }
    .tooltip-group {
        text-align: right;
    }
    .tooltip-group .tooltip-item {
        margin-left: 20px;
        line-height: 40px;
    }
    .tooltip-group .tooltip-item:hover span.fa {
        color: darkseagreen;
    }
    .completed-task {
        color: #8FBC8F;
        font-size: 12px;
    }
    .task-list {
        background-color: #fff;
        padding: 30px 20px;
    }
    .task-list .task-item {
        margin-bottom: 10px;
    }
    .task-in-charge .el-button {
        padding: 0;
        font-size: 11px;
        color: #909399;
    }
    .el-popover .el-form-item {
        margin-bottom: 5px;
    }
    .el-popover .el-form-item__label {
        padding-bottom: 0 !important;
    }
    .member-list {
        margin: 0;
        padding: 0;
    }
    .member-list .item-member {
        display: block;
        list-style: none;
        border-bottom: 1px solid #f7f7f7;
    }
    .task-date .el-date-editor {
        width: 100%;
        margin-top: 5px;
        border-bottom: none;
    }
    .header-operation {
        margin-top: 20px;
    }
    .header-operation button {
        margin: 0;
    }
    .task-name-edit {
        visibility: hidden;
        padding: 0;
        margin: 0;
    }
    .task-item:hover .task-name-edit {
        visibility: visible;
    }
    .task-item .el-form-item {
        padding: 0;
        margin: 0;
    }
</style>

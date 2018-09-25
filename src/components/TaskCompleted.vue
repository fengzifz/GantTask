<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="task-list">
            <el-row>
                <el-col :span="12">
                    <h2 class="title">
                        <i class="fa fa-check-square"></i>&nbsp;&nbsp;{{ curProName }}(已完成)
                    </h2>
                </el-col>
            </el-row>
            <el-row class="task-list">
                <el-col class="task-item" :span="24" v-for="(task) in tasks" :key="task.id">
                    <!-- 任务列表 Start -->
                    <el-checkbox
                        disabled
                        :checked="task.status === 1"
                        class="task-check"/>
                    <router-link :to="'/project/tasks/details/' + task.id">
                        <span class="task-name">{{ task.name }}</span>
                        <i style="font-size: 0.7rem;" v-if="task.description" class="fa fa-align-left"></i>
                    </router-link>
                    <el-tag size="mini" type="info" class="task-in-charge">
                        {{ task.executor || '未指派' }}
                        <span v-if="task.start && task.end">
                                 , {{ (new Date(task.end).getMonth() + 1) + '月' + new Date(task.end).getDate() + '日'}}
                        </span>
                    </el-tag>
                    <!-- 任务列表 End -->
                </el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'TaskCompleted',
    data () {
        return {
            tasks: [],
            loading: false
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken,
            pid: state => state.project.currentProjectId,
            tid: state => state.team.currentTeamId,
            curProName: state => state.project.currentProjectName
        })
    },
    created: function () {
        this.getCompletedTasks()
    },
    methods: {
        getCompletedTasks: function () {
            this.loading = true
            axios.get('task/get_completed?api_token=' + this.apiToken + '&team_id=' + this.tid +
            '&project_id=' + this.pid).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.tasks = res.data.data
                }
                this.loading = false
            })
        }
    }
}
</script>

<style scoped>
    .task-list {
        background-color: #fff;
        padding: 30px 20px;
    }
    .task-list .task-item {
        margin-bottom: 10px;
    }
    .task-name {
        font-size: 0.9rem;
        padding-left: 8px;
    }
</style>

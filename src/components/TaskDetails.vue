<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="loading">
        <div id="task-details">
            <el-row class="header">
                <el-col :span="20">
                    <h2 class="title">
                        <el-checkbox
                            @change="completedTask($event, task.executor_id)"
                            :value="task.status === 1">
                            {{ task.name }}
                        </el-checkbox>
                    </h2>
                </el-col>
                <el-col :span="4" align="right">
                    <div class="header-operation">
                        <el-popover
                            placement="left"
                            width="150"
                            visible="deleteVisible"
                            trigger="click">
                            <p>确定删除任务吗？</p>
                            <el-button @click="deleteTask" type="primary" size="mini">确定</el-button>
                            <el-button type="text" slot="reference" class="delete">删除任务</el-button>
                        </el-popover>
                    </div>
                </el-col>
            </el-row>
            <el-row
                v-loading="descLoading"
                element-loading-spinner="el-icon-loading"
                class="task-details">
                <el-col :span="24" v-if="!isEdit">
                    <div id="task-description" v-if="task.description" v-html="task.description"></div>
                    <el-button type="text" @click="isEdit = true">编辑</el-button>
                </el-col>
                <el-col :span="24" v-else>
                    <quill-editor
                        v-model="task.description"
                        :options="editorOptions"/>
                    <div class="btn-group">
                        <el-button size="small" @click="isEdit = false">取消</el-button>
                        <el-button size="small" type="primary" @click="updateDesc">保存</el-button>
                    </div>
                </el-col>
            </el-row>
            <div class="line"></div>
            <el-row class="comment" :gutter="30">
                <el-col :span="2">
                    <img width="100%" src="../assets/avatar/n.png"/>
                </el-col>
                <el-col :span="15">
                    <el-input placeholder="发表评论" type="textarea"></el-input>
                </el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script>
import {mapState} from 'vuex'
import router from '../router/index'
import axios from 'axios'
import {Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
export default {
    name: 'TaskDetails',
    data () {
        return {
            task: {description: ''},
            loading: false,
            isEdit: false,
            descLoading: false,
            editorOptions: {
                placeholder: '请输入内容...',
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: 'img',
                        action: process.env.EDITOR_IMG_UPLOAD,
                        response: res => {
                            if (res.data.error) {
                                this.$message.error(res.data.message)
                            } else {
                                return process.env.HOST + '/storage/' + res.data.path
                            }
                        }
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            'image': function () {
                                QuillWatch.emit(this.quill.id)
                            }
                        }
                    }
                }
            }
        }
    },
    computed: {
        ...mapState({
            apiToken: state => state.user.apiToken,
            currentTeamId: state => state.team.currentTeamId,
            currentProjectId: state => state.project.currentProjectId,
            userId: state => state.user.userId
        })
    },
    created: function () {
        this.getTask()
    },
    updated: function () {
        this.resizeImgSize()
    },
    methods: {
        resizeImgSize: function () {
            let images = document.getElementsByTagName('img')
            let standardWidth = document.getElementById('task-description').clientWidth
            let len = images.length
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (images[i].clientWidth > standardWidth) {
                        images[i].style.width = standardWidth + 'px'
                    }
                }
            }
        },
        deleteTask: function () {
            // 删除任务
            this.descLoading = true
            axios.delete('task/delete?api_token=' + this.apiToken + '&team_id=' + this.currentTeamId +
            '&project_id=' + this.currentProjectId + '&id=' + this.$route.params.id).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                    this.descLoading = false
                } else {
                    this.$message.success(res.data.message)
                    this.descLoading = false
                    router.push('/project/tasks')
                }
            })
        },
        completedTask: function (isCompleted, eid) {
            // eid - executor_id
            // 完成任务
            this.descLoading = true
            let status = isCompleted ? 1 : 0
            let data = {
                api_token: this.apiToken,
                status: status,
                id: this.$route.params.id,
                project_id: this.currentProjectId,
                team_id: this.currentTeamId
            }
            if (!eid) {
                data.executor_id = this.userId
            }
            axios.post('task/update_status', data).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.task.status = res.data.data.status
                }
                this.descLoading = false
            })
        },
        getTask: function () {
            // 根据 id 获取任务信息
            this.loading = true
            let tid = this.$route.params.id
            axios.get('task/get?api_token=' + this.apiToken + '&project_id=' + this.currentProjectId +
            '&team_id=' + this.currentTeamId + '&id=' + tid).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                    router.push('/project/tasks')
                } else {
                    this.task = res.data.data
                }
                this.loading = false
            })
        },
        updateDesc: function () {
            // 更新任务描述内容
            this.descLoading = true
            axios.post('task/update_desc', {
                description: this.task.description,
                team_id: this.currentTeamId,
                project_id: this.currentProjectId,
                id: this.$route.params.id,
                api_token: this.apiToken
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.isEdit = false
                }
                this.descLoading = false
            })
        }
    }
}
</script>

<style scoped>
    .task-details {
        background-color: #fff;
        padding: 20px;
    }
    .header-operation {
        margin-top: 20px;
    }
    .header-operation .delete {
        color: #F56C6C;
    }
    .btn-group {
        margin-top: 20px;
    }
</style>

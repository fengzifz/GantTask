<template>
    <el-main class="el-main-fixed-width el-main-no-bg"
             element-loading-spinner="el-icon-loading"
             v-loading="allLoading">
        <div id="projects-list">
            <h2 class="title">
                <i class="fa fa-th-large"></i>&nbsp;&nbsp;项目
                <el-button class="project-new" type="text" @click="dialogVisible = true">新建项目</el-button>
            </h2>
            <el-row :gutter="30">
                <el-col class="project-item" :span="6" v-for="(project, index) in projects" :key="project.id">
                    <div class="project-btn">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <el-row>
                                <el-col :span="8">
                                    <div class="project-img">
                                        <img src="../assets/pro-img-01.png" />
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <el-button type="text" @click="goToTasks(project.id, project.name)" class="project-info">
                                        <div class="title">{{ project.name}}</div>
                                        <div class="desc">{{ project.description }}</div>
                                    </el-button>
                                </el-col>
                                <el-col :span="24">
                                    <div class="members">
                                        <el-button @click="showEditDialog(project, index)"
                                                   style="padding: 0;"
                                                   type="text"
                                                   size="small">
                                            <i class="fa fa-cog"></i> 设置
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 添加项目弹窗 start -->
        <el-dialog
            title="添加项目"
            :visible.sync="dialogVisible"
            width="30%"
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            center>
            <el-form ref="newProject" :model="newProject" label-width="80px">
                <el-form-item label="项目名称">
                    <el-input v-model="newProject.name"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input type="textarea" v-model="newProject.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="create">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加项目弹窗 end -->
        <!-- 修改项目弹窗 start -->
        <el-dialog
            title="修改项目信息"
            :visible.sync="editDialog"
            element-loading-spinner="el-icon-loading"
            v-loading="editLoading"
            width="30%">
            <el-dialog
                width="20%"
                title="确定删除？"
                content="删除后不可恢复，请确认是否删除？"
                element-loading-spinner="el-icon-loading"
                v-loading="delLoading"
                :visible.sync="deleteVisible"
                append-to-body>
                <span><strong>温馨提示：删除项目后不可恢复，请谨慎处理</strong></span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteProject" type="danger" size="small">删除</el-button>
                </span>
            </el-dialog>
            <el-form label-width="80px">
                <el-form-item label="项目名称">
                    <el-input v-model="editProject.name" />
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input type="textarea" v-model="editProject.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="danger" @click="deleteVisible = true" style="float: left;">删 除</el-button>
                <el-button size="small" @click="editDialog = false">取 消</el-button>
                <el-button size="small" type="primary" @click="updateProject">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改项目弹窗 end -->
    </el-main>
</template>

<script>
import router from '../router/index'
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    name: 'Projects',
    data () {
        return {
            dialogVisible: false,
            editDialog: false,
            newProject: {name: '', desc: ''},
            editProject: {id: 0, name: '', description: '', index: 0},
            loading: false,
            allLoading: false,
            editLoading: false,
            delLoading: false,
            deleteVisible: false
        }
    },
    computed: {
        ...mapState({
            currentTeamId: state => state.team.currentTeamId,
            apiToken: state => state.user.apiToken,
            projects: state => state.project.projects
        })
    },
    created: function () {
        this.getAllProjects()
    },
    methods: {
        deleteProject: function () {
            // 删除项目
            this.delLoading = true
            let uri = '?api_token=' + this.apiToken + '&id=' + this.editProject.id + '&team_id=' + this.currentTeamId
            axios.delete('project/delete' + uri).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.deleteVisible = false
                    this.editDialog = false
                    this.$store.dispatch('project/deleteProject', this.editProject.index)
                    this.editProject = {id: 0, name: '', description: '', index: 0}
                }
                this.delLoading = false
            })
        },
        create: function () {
            // 创建项目
            this.loading = true
            axios.post('project/create', {
                api_token: this.apiToken,
                name: this.newProject.name,
                description: this.newProject.desc,
                team_id: this.currentTeamId
            }).then((res) => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$message.success(res.data.message)
                    this.$store.dispatch('project/addProject', res.data.data)
                    this.newProject = {name: '', desc: ''}
                }
                this.loading = false
                this.dialogVisible = false
            })
        },
        getAllProjects: function () {
            this.allLoading = true
            axios.get('/project/get_all?api_token=' + this.apiToken + '&team_id=' + this.currentTeamId)
                .then((res) => {
                    if (res.data.error) {
                        this.$message.error(res.data.message)
                    } else {
                        this.$store.dispatch('project/setProjects', res.data.data)
                    }
                    this.allLoading = false
                })
        },
        goToTasks: function (id, name) {
            // 跳转到任务管理界面
            this.$store.dispatch('project/switchProject', {id: id, name: name})
            router.push('/project/tasks')
        },
        showEditDialog: function (p, index) {
            // 弹出项目设置的窗口
            this.editDialog = true
            this.editProject.id = p.id
            this.editProject.name = p.name
            this.editProject.description = p.description
            this.editProject.index = index
        },
        updateProject: function () {
            // 更新项目
            this.editLoading = true
            axios.post('project/update', {
                id: this.editProject.id,
                name: this.editProject.name,
                description: this.editProject.description,
                api_token: this.apiToken,
                team_id: this.currentTeamId
            }).then(res => {
                if (res.data.error) {
                    this.$message.error(res.data.message)
                } else {
                    this.$store.dispatch('project/updateProject', this.editProject)
                }
                this.editLoading = false
                this.editDialog = false
            })
        }
    }
}
</script>
<style scoped>
    .project-item .members {
        color: #c8c8c8;
        text-align: right;
        padding-right: 10px;
    }
    .project-item .desc {
        font-size: 0.7rem;
    }
    .project-item {
        padding-bottom: 15px;
    }
    .project-info {
        padding: 12px 10px 0 0;
        text-align: left;
    }
    .project-info .title {
        font-weight: bold;
        font-size: 0.9rem;
        margin-bottom: 5px;
    }
    .project-img {
        width: 50px;
        height: 50px;
        margin: 10px auto 0;
        -webkit-border-radius: 25px;
        -moz-border-radius: 25px;
        border-radius: 25px;
        overflow: hidden;
    }
    .project-img img {
        width: 100%;
    }
    .project-btn {
        width: 100%;
        padding: 0;
    }
    .el-card {
        height: 88px;
        background-color: #fff;
    }
    .card-wrapper {
        padding: 20px 20px;
    }
    .view-grid:hover span, .view-list:hover span {
        color: #8FBC8F;
    }
    .members {
        display: none;
    }
    .project-btn:hover .members {
        display: block;
    }
</style>

<template>
    <div id="project-details">
        <el-row class="header">
            <el-col :span="3">
                <h1 class="title">部门任务</h1>
                <span class="desc">部门的常规任务列表</span>
            </el-col>
            <el-col class="tooltip-group" :span="3" :offset="18">
                <router-link :to="'/'" class="tooltip-item tooltip-chart" type="text">
                    <span class="fa fa-bar-chart fa-lg"></span>
                </router-link>
                <router-link :to="'/project/tasks/members'" class="tooltip-item tooltip-user" type="text">
                    <span class="fa fa-user fa-lg"></span>
                </router-link>
                <router-link :to="'/project/tasks/settings'" class="tooltip-item tooltip-setting" type="text">
                    <span class="fa fa-cog fa-lg"></span>
                </router-link>
            </el-col>
        </el-row>
        <el-row class="task-list">
            <el-col class="task-item" :span="24">
                <el-checkbox class="task-check" />
                <router-link :to="'/project/tasks/details'">
                    <span class="task-name">修改设计图</span>
                </router-link>
                <el-tag size="mini" type="info" class="task-in-charge">
                    <el-popover
                        placement="top"
                        width="160"
                        v-model="taskTip.visible">
                        <el-form ref="form" label-width="80px" label-position="top" size="mini">
                            <el-form-item label="指派给谁">
                                <el-input name="who_in_charge"></el-input>
                            </el-form-item>
                            <el-form-item label="开始时间">
                                <el-input name="date_start"></el-input>
                            </el-form-item>
                            <el-form-item label="截止时间">
                                <el-input name="date_end"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button type="text" slot="reference">陈子峰</el-button>
                    </el-popover>
                </el-tag>
            </el-col>
            <el-col class="task-item" :span="24">
                <el-checkbox class="task-check" />
                <span class="task-name">部署 HTTPS 加密证书</span>
                <el-tag size="mini" type="info" class="task-in-charge">梁晓东</el-tag>
            </el-col>
            <el-col class="task-item" :span="24">
                <el-checkbox class="task-check" />
                <span class="task-name">关于神经网络算法的讨论</span>
                <el-tag size="mini" type="info" class="task-in-charge">李耀鹏</el-tag>
            </el-col>
            <el-col class="task-item" :span="24">
                <el-checkbox class="task-check" />
                <span class="task-name">参加区块链沙龙</span>
            </el-col>
            <el-col class="task-item" :span="24"><router-link class="completed-task" :to="'/'">已完成任务</router-link></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'ProjectTasks',
    data () {
        return {
            checked: true,
            taskTip: {visible: false}
        }
    }
}
</script>

<style scoped>
    #project-details h1.title {
        margin: 0;
        line-height: 40px;
    }
    #project-details .header {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid darkseagreen;
    }
    #project-details .desc {
        font-size: 8px;
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
    }
    .task-list .task-item {
        margin-bottom: 10px;
    }
    .task-item .el-button {
        padding: 0;
        font-size: 8px;
        color: #909399;
    }
</style>

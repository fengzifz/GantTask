<template>
    <div id="project-settings">
        <el-row class="header">
            <el-col :span="3">
                <h1 class="title">项目成员</h1>
            </el-col>
        </el-row>
        <el-row class="member-list" :gutter="20">
            <el-col class="member-item" :span="3">
                <el-button type="text" @click="goToTasks">
                    <el-card shadow="hover" :body-style="{ padding: '10px' }">
                        <img src="../assets/avatar/1.png" width="80%" class="image">
                        <div class="member-info">
                            <div class="name">陈子峰</div>
                            <div class="role">超级管理员</div>
                        </div>
                    </el-card>
                </el-button>
            </el-col>
            <el-col class="member-list" :span="3">
                <el-button class="member-item" type="text" @click="goToTasks">
                    <el-card shadow="hover" :body-style="{ padding: '10px' }">
                        <img src="../assets/avatar/2.png" width="80%" class="image">
                        <div class="member-info">
                            <div class="name">李耀鹏</div>
                            <div class="role">成员</div>
                        </div>
                    </el-card>
                </el-button>
            </el-col>
            <el-col class="member-list" :span="3">
                <el-button class="member-item" type="text" @click="goToTasks">
                    <el-card shadow="hover" :body-style="{ padding: '10px' }">
                        <img src="../assets/avatar/3.png" width="80%" class="image">
                        <div class="member-info">
                            <div class="name">梁晓东</div>
                            <div class="role">管理员</div>
                        </div>
                    </el-card>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'ProjectMembers'
}
</script>

<style scoped>
    .member-item .name {
        font-size: 14px;
        margin-top: 8px;
        margin-bottom: 5px;
    }
    .member-item .role {
        font-size: 6px;
        color: #bfbfbf;
    }
</style>

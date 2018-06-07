<template>
    <div id="projects-list">
        <el-row class="header">
            <el-col class="view-group" :span="6" :offset="18">
                <el-button class="new-pro" type="text">
                    <span>新建项目</span>
                </el-button>
                <el-button class="view-grid" type="text">
                    <span class="fa fa-th fa-lg"></span>
                </el-button>
                <el-button class="view-list" type="text">
                    <span class="fa fa-list fa-lg"></span>
                </el-button>
            </el-col>
        </el-row>
        <el-row :gutter="30">
            <el-col :span="4">
                <el-button type="text" @click="goToTasks">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <img src="../assets/pro-img/1.png" width="100%" class="image">
                        <div style="padding: 14px;">
                            <span>部门任务</span>
                        </div>
                    </el-card>
                </el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="text" @click="goToTasks">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <img src="../assets/pro-img/3.png" width="100%" class="image">
                        <div style="padding: 14px;">
                            <span>内部 OA 开发</span>
                        </div>
                    </el-card>
                </el-button>
            </el-col>
            <el-col :span="4" v-for="(o) in 3" :key="o">
                <el-button type="text" @click="goToTasks">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <img src="../assets/pro-img/2.png" width="100%" class="image">
                        <div style="padding: 14px;">
                            <span>项目</span>
                        </div>
                    </el-card>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import router from '../router/index'
export default {
    name: 'Projects',
    data () {
        return {
            currentDate: '2018-04-09'
        }
    },
    methods: {
        goToTasks: function () {
            router.push('/project/tasks')
        }
    }
}
</script>

<style scoped>
    .card-wrapper {
        padding: 20px 20px;
    }
    .view-group {
        text-align: right;
    }
    .view-grid:hover span, .view-list:hover span {
        color: #8FBC8F;
    }
</style>

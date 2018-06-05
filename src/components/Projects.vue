<template>
    <div id="projects-list">
        <el-row>
            <el-col :span="6" v-for="(o) in 15" :key="o">
                <div class="card-wrapper">
                    <el-card shadow="hover" :body-style="{ padding: '0px' }">
                        <img src="../assets/pro-img-01.png" width="100%" class="image">
                        <div style="padding: 14px;">
                            <span>项目</span>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Projects',
    data () {
        return {
            currentDate: '2018-04-09'
        }
    }
}
</script>

<style scoped>
    .card-wrapper {
        padding: 20px 20px;
    }
</style>

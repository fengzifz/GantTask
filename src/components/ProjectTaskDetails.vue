<template>
    <div id="task-details">
        <el-row class="header">
            <el-col :span="24">
                <h1 class="title">
                    <el-checkbox>配置 HTTPS 证书</el-checkbox>
                </h1>
            </el-col>
        </el-row>
        <el-row class="content">
            <p>在服务器上配置 HTTPS 证书</p>
            <ul>
                <li>系统：Ubuntu</li>
                <li>Web Server：Nginx</li>
            </ul>
        </el-row>
        <hr />
        <el-row class="comment" :gutter="30">
            <el-col :span="2">
                <img width="100%" src="../assets/avatar/10.png" />
            </el-col>
            <el-col :span="15">
                <el-input placeholder="发表评论" type="textarea"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'ProjectTaskDetails'
}
</script>

<style scoped>

</style>

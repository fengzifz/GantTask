<template>
    <div id="project-settings">
        <el-row class="header">
            <el-col :span="3">
                <h1 class="title">项目设置</h1>
            </el-col>
        </el-row>
        <el-form ref="form" :model="settings">
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-input v-model="settings.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-input type="textarea" v-model="settings.description"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item>
                        <el-button type="primary">保存设置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'ProjectSettings',
    data () {
        return {
            settings: {name: '部门任务', description: '部门的常规任务列表'}
        }
    }
}
</script>

<style scoped>

</style>

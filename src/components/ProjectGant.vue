<template>
    <div class="gant-target"></div>
</template>

<script>
/* eslint-disable no-new */
import Gantt from 'frappe-gantt'
export default {
    name: 'ProjectGant',
    mounted: function () {
        let tasks = [
            {id: '1', name: '修改设计图', start: '2018-06-1', end: '2018-06-27', progress: 20},
            {id: '2', name: '部署 HTTPS 加密证书', start: '2018-06-15', end: '2018-06-20', progress: 10},
            {id: '3', name: '测试', start: '2018-06-10', end: '2018-06-20', progress: 0},
            {id: '4', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 30},
            {id: '5', name: '测试', start: '2018-06-16', end: '2018-06-20', progress: 0},
            {id: '6', name: '测试', start: '2018-06-19', end: '2018-06-20', progress: 0},
            {id: '7', name: '测试', start: '2018-06-20', end: '2018-06-20', progress: 0},
            {id: '8', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '9', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '10', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '11', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '12', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '13', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '14', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '15', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '16', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '17', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '18', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '19', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '20', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0},
            {id: '21', name: '测试', start: '2018-06-15', end: '2018-06-20', progress: 0}
        ]
        let gant = new Gantt('.gant-target', tasks)
        gant.change_view_mode('Day')
    }
}
</script>

<style scoped>

</style>

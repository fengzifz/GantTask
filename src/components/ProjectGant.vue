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
            {
                id: 'Task 1',
                name: '需求分析',
                start: '2018-06-1',
                end: '2018-06-27',
                progress: 20,
                dependencies: ''
            },
            {
                id: 'Task 2',
                name: '测试',
                start: '2018-06-15',
                end: '2018-06-20',
                progress: 0,
                dependencies: 'Task 1'
            }
        ]
        let gant = new Gantt('.gant-target', tasks)
        gant.change_view_mode('Day')
    }
}
</script>

<style scoped>

</style>

<template>
    <div class="hello">
        <div class="gantt-target"></div>
    </div>
</template>

<script>
/* eslint-disable no-new */
import Gantt from 'frappe-gantt'
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            name: this.createGannt()
        }
    },
    mounted: function () {
        let tasks = [
            {
                id: 'Task 1',
                name: '需求分析',
                start: '2016-12-28',
                end: '2016-12-31',
                progress: 20,
                dependencies: ''
            },
            {
                id: 'Task 2',
                name: '测试',
                start: '2016-12-31',
                end: '2017-01-09',
                progress: 0,
                dependencies: 'Task 1'
            }
        ]
        new Gantt('.gantt-target', tasks)
    },
    methods: {
        createGannt: function () {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

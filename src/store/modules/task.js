const state = {
    tasks: [], // 任务列表
    isAddingTask: false,
    isEdit: false
}

const actions = {
    setTasks ({commit, state}, tasks) {
        commit('setTasks', tasks)
    },
    addTask ({commit, state}, task) {
        commit('addTask', task)
    },
    displayAddingTask ({commit, state}, status) {
        commit('addingTask', status)
    },
    updateTaskExecutor ({commit, state}, task) {
        commit('updateTaskExecutor', task)
    },
    updateTaskDate ({commit, state}, task) {
        commit('updateTaskDate', task)
    },
    updateTaskStatus ({commit, state}, task) {
        commit('updateTaskStatus', task)
    },
    updateTaskName ({commit, state}, task) {
        commit('updateTaskName', task)
    },
    edit ({commit, state}, status) {
        commit('edit', status)
    }
}

const mutations = {
    setTasks (state, tasks) {
        state.tasks = tasks
    },
    addTask (state, task) {
        state.tasks.push(task)
    },
    addingTask (state, status) {
        state.isAddingTask = status
    },
    updateTaskExecutor (state, task) {
        state.tasks[task.index]['executor_id'] = task.data.executor_id
        state.tasks[task.index]['executor'] = task.data.executor
    },
    updateTaskDate (state, task) {
        state.tasks[task.index]['start'] = task.data.start
        state.tasks[task.index]['end'] = task.data.end
    },
    updateTaskStatus (state, task) {
        state.tasks[task.index]['status'] = task.data.status
    },
    updateTaskName (state, task) {
        state.tasks[task.index]['name'] = task.name
    },
    edit (state, status) {
        state.isEdit = status
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

const state = {
    projects: [],
    currentProjectId: localStorage.getItem('currentProjectId'),
    currentProjectName: localStorage.getItem('currentProjectName'),
    showInBreadcrumb: false
}

const actions = {
    setProjects ({commit, state}, projects) {
        commit('setProjects', projects)
    },
    addProject ({commit, state}, project) {
        commit('addProject', project)
    },
    switchProject ({commit, state}, project) {
        commit('switchProject', project)
    },
    showBreadcrumb ({commit, state}, status) {
        commit('showBreadcrumb', status)
    },
    updateProject ({commit, state}, project) {
        commit('updateProject', project)
    },
    deleteProject ({commit, state}, index) {
        commit('deleteProject', index)
    }
}

const mutations = {
    setProjects (state, projects) {
        state.projects = projects
    },
    deleteProject (state, index) {
        state.projects.splice(index, 1)
    },
    addProject (state, project) {
        state.projects.push(project)
    },
    switchProject (state, p) {
        state.currentProjectId = p.id
        state.currentProjectName = p.name
        localStorage.setItem('currentProjectId', p.id)
        localStorage.setItem('currentProjectName', p.name)
    },
    showBreadcrumb (state, status) {
        state.showInBreadcrumb = status
    },
    updateProject (state, p) {
        state.projects[p.index]['name'] = p.name
        state.projects[p.index]['description'] = p.description
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

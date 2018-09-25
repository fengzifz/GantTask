/* eslint-disable handle-callback-err */

// 初始状态
const state = {
    apiToken: localStorage.getItem('apiToken'),
    userId: localStorage.getItem('userId'),
    userAvatar: localStorage.getItem('userAvatar'),
    name: localStorage.getItem('name'),
    userInfo: {}
}

// 派生的状态
const getters = {
    // ...
}

// 是用来进行 commit，xxx.dispatch('login', xxx)
const actions = {
    login ({commit, state}, user) {
        commit('setApiToken', user.apiToken)
        commit('setUserId', user.userId)
        commit('setUserAvatar', user.userAvatar)
        commit('setUsername', user.name)
    },
    logout ({commit, state}) {
        commit('logout')
    },
    setUsername ({commit, state}, name) {
        commit('setUsername', name)
    },
    setUserInfo ({commit, state}, userInfo) {
        commit('setUserInfo', userInfo)
    },
    changeEmail ({commit, state}, userInfo) {
        commit('changeEmail', userInfo)
    },
    changePassword ({commit, state}, userInfo) {
        commit('changePassword', userInfo)
    }
}

// 所有需要改变 state 的操作，都放在 mutations 里面
const mutations = {
    logout (state) {
        // 退出登录，只需要移除 apiToken
        state.apiToken = null
        localStorage.removeItem('apiToken')
    },
    setApiToken (state, apiToken) {
        state.apiToken = apiToken
        localStorage.setItem('apiToken', apiToken)
    },
    setUserId (state, userId) {
        state.userId = userId
        localStorage.setItem('userId', userId)
    },
    setUsername (state, name) {
        state.name = name
        localStorage.setItem('name', name)
    },
    setUserAvatar (state, userAvatar) {
        state.userAvatar = userAvatar
        localStorage.setItem('userAvatar', userAvatar)
    },
    setUserInfo (state, userInfo) {
        state.userInfo = userInfo
    },
    changeEmail (state, userInfo) {
        state.userInfo = userInfo
    },
    changePassword (state, userInfo) {
        state.userInfo = userInfo
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

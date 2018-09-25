/* eslint-disable handle-callback-err */

const state = {
    currentTeamId: localStorage.getItem('currentTeamId'),
    currentTeamName: localStorage.getItem('currentTeamName'),
    teams: []
}

const actions = {
    switchTeam ({commit, state}, team) {
        commit('setCurrentTeam', team)
    },
    setTeams ({commit, state}, teams) {
        commit('setTeams', teams)
    },
    addTeam ({commit, state}, team) {
        commit('addTeam', team)
    },
    removeCurrentTeam ({commit}) {
        commit('removeCurrentTeam')
    }
}

const mutations = {
    setCurrentTeam (state, team) {
        state.currentTeamId = team.id
        state.currentTeamName = team.name
        localStorage.setItem('currentTeamId', team.id)
        localStorage.setItem('currentTeamName', team.name)
    },
    removeCurrentTeam () {
        localStorage.removeItem('currentTeamId')
        localStorage.removeItem('currentTeamName')
    },
    setTeams (state, teams) {
        state.teams = teams
    },
    addTeam (state, team) {
        state.teams.push(team)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}

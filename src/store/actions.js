export const setCandidates = ({commit}, value) => {
    commit('SET_CANDIDATES', [])
    commit('SET_CANDIDATES', value)
}
export const setVoters = ({commit}, value) => {
    commit('SET_VOTERS', [])
    commit('SET_VOTERS', value)
}

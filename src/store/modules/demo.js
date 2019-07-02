const DEMO_PERSON = 'DEMO_PERSON'
const demo = {
  state: {
    person: {
      name: 'zhangsan',
      age: 18
    }
  },
  mutations: {
    DEMO_PERSON: (state, newState) => {
      state.preson = newState
    }
  },
  actions: {
    setPerson: ({ commit }, newState) => {
      return commit(DEMO_PERSON, newState)
    }
  }
}
export default demo

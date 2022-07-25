const userStore = {
    state: {
        balance: 0,
    },
    getters: {},
    mutations: {
        setBalance(state:any, payload:any) {
            state.balance = payload;
        }
    },
    actions: {
        async getBalance({state, commit}:{state:any,commit:any}) {
            const balance = await state.web3.eth.getBalance(state.account)
            commit('setBalance', balance)
        }
    },
}
export default userStore
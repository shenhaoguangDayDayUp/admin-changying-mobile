
const app = {
    state:{
        isLoading:false,
        defaultAderess:'',
        defaultAvatar:'',
        goodsList:{goods:[],selected:false},
        routes:{},

    },
    mutations: {
        updateAddres(state, payload){
          state.defaultAderess = payload
        },
        updateLoadingStatus (state, payload) {
          state.isLoading = payload.isLoading
        },
        updateAvatar(state,payload){
          state.defaultAvatar = payload
        },
        updateGoodsList (state, payload) {
          state.goodsList = payload
        },
        updateRoutes(state, payload){
          state.routes = payload
        }
     },
     actions: {
        toggleUpdateAddres({ commit },view){
          commit('updateAddres',view)
        },
        toggleLoadingStatus({ commit },view) {
          commit('updateLoadingStatus',view)
        },
        toggleUpdateAvatar({ commit },view) {
          commit('updateAvatar',view)
        },
        toggleGoodsList({ commit },view){
          commit('updateGoodsList',view)
        },
        toggleRoutes({ commit },view){
          commit('updateRoutes',view)
        }
      }

}
export default app
const getters = {
    isLoading: state => state.app.isLoading,
    defaultAderess: state => state.app.defaultAderess,
    defaultAvatar: state => state.app.defaultAvatar,
    goodsList:state => state.app.goodsList,
    routes:state => state.app.routes,
    getDistrict :state =>  state.app.district
    
        
    
}
export default getters
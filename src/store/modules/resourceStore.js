let resourceStore ={
    state:{
        docResStore:{}
    },
    mutations:{
        SET_DOCRES:(state,item)=>{
            state.docResStore = item;
        }
    },
    actions:{
        setDocres({ commit }, item){ 
            console.log(item)
            return new Promise((resolve, reject) => {
                commit('SET_DOCRES',item);
                resolve(item);
            }).catch(error => { 
                // reject(error);
                
            });
        },
    }

}
export default resourceStore;
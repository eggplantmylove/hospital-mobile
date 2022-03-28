let patInfoStore ={
    state:{
        patObject:{
            id:'',
            real_name:'',
            id_no:'',
            his_pat_id:'',
            openid:''
        },
        storePatList:[],
        hospitalizationObject:{}
    },
    mutations:{
        SET_PATOBJECT:(state,patObject)=>{
            state.patObject = patObject;
        },
        SET_HOSPITALIZATION:(state,hospitalizationObject)=>{
            state.hospitalizationObject = hospitalizationObject;
        },
        SET_PATLIST:(state,patList)=>{
            state.storePatList = patList;
        },
    },
    actions:{
        setPatObject({ commit }, patObject){  
            return new Promise((resolve,reject) => {
                commit('SET_PATOBJECT',patObject);
                resolve(patObject);
            }).catch(error => { 
                
                // reject(error);
                
            });
        },
        setHospitalization({commit},hospitalizationObject){
            return new Promise((resolve,reject) => {
                commit('SET_HOSPITALIZATION',hospitalizationObject);
                resolve(hospitalizationObject);
            }).catch(error => {  
                // reject(error);
                
            });
        },
        setPatList({commit},patList){
            return new Promise((resolve,reject) => {
                commit('SET_PATLIST',patList);
                resolve(patList);
            }).catch(error => {  
                // reject(error);
                
            });
        }
    }

}
export default patInfoStore;
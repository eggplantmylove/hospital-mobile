let hospitalStore ={
    state:{
        hospitalObject:{
            id:'',
            hospital_code:'',
            name:'',
            logo:'',
            hospital_address:'',
            hospital_phone:'',
            hospital_introduction:''
        }
    },
    mutations:{
        SET_HOSPITALOBJECT:(state,hospitalObject)=>{
            state.hospitalObject = hospitalObject;
        }
    },
    actions:{
        setHospitalObject({ commit }, hospitalObject){  
            return new Promise((resolve,reject) => { 
                commit('SET_HOSPITALOBJECT',hospitalObject);
                resolve(hospitalObject);
            }).catch(error => { 
                
                // reject(error);
                
            });
        },
    }

}
export default hospitalStore;
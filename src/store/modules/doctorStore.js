let dcotorStore ={
    state:{
        doctorObject:{ 
        }
    },
    mutations:{
        SET_DOCTOROBJECT:(state,doctorObject)=>{
            state.doctorObject = doctorObject;
        }
    },
    actions:{
        setDoctorObject({ commit }, doctorObject){  
            return new Promise((resolve,reject) => {
                commit('SET_DOCTOROBJECT',doctorObject);
                resolve(doctorObject);
            }).catch(error => { 
                
                // reject(error);
                
            });
        },
    }

}
export default dcotorStore;
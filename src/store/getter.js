const  getters ={
    // mpMessageInfo:state=>state.mpMessageStore.messageObject,
    // userObject:state=>state.userSalaryStore.userObject,
    // salaryList:state=>state.userSalaryStore.salaryList
    patObjectStore:state=>state.patInfoStore.patObject,
    storePatList:state=>state.patInfoStore.storePatList,
    hospitalizationObjectStore:state=>state.patInfoStore.hospitalizationObject,
    resObjectStore:state=>state.resourceStore.docResStore,
    hosObjectStore:state=>state.hospitalStore.hospitalObject,
    doctorObjectStore:state=>state.doctorStore.doctorObject
 };
 export default getters
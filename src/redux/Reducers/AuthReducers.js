const INITIAL_STATE = {
    id:0,
    nama:'',
    email:'',
    phone_number:'',
    dataUsers:[],
    listBarang:[],
    isLogin:false,
    isLoading:false
}

export default (state =INITIAL_STATE,action)=>{
    switch(action.type){
        
        case 'LOGIN':
            console.log('auth reducer jalan')
            return {...state,isLogin:true,isLoading:false,dataUsers:action.dataUsers}

        case 'LOGOUT':
                return {INITIAL_STATE}

        default : return state
    }
}
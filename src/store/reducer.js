const initState = {
    passwords:{
        alldata:[],
        data:{},
        status:null,
        loading:'false',
        error:{},
    },
    isLogin:false,
    email:"",
}

export default function(state = initState, action){
    switch(action.type){
        case 'SET_DATA':
            return{
                ...state,
                passwords:{
                    alldata:action.data
                }
            }
        case 'SUCCESS_PASSWORD':
            return {
                passwords:{
                    status:true
                }
            }
        case 'ERROR_PASSWORD':
            return{
                passwords:{
                    status:false
                }
            }
        case 'RESET_STATUS':
            return{
                passwords:{
                    status:null
                }
            }
        case "SET_ISLOGIN":
            console.log('masukkk login',action.data);
            console.log(state)
            return {
              ...state,
              isLogin: action.data
            };
        case "SET_EMAIL":
            console.log('masukk email',action.data);
            return {
            ...state, 
            email:action.data
            
        };
        default:
            return state 
    }
}
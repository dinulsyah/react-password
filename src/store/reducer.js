const initState = {
    passwords:{
        data:{},
        status:null,
        loading:'false',
        error:{}
    }
}

export default function(state = initState, action){
    switch(action.type){
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
        default:
            return state 
    }
}
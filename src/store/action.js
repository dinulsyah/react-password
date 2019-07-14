import { SUCCESS_PASSWORD , ERROR_PASSWORD, RESET_STATUS} from './actionType';
import firebase from '../config/firebase';

const database = firebase.firestore().collection('passwords');

export function createPassword(payload){
    console.log(payload)
    return (dispatch) => {
        database
        .add(payload)
        .then((docRef) => {
            console.log(docRef)
            dispatch(successPassword())
        })
        .catch((error) => {
            console.log(error)
            dispatch(failedPassword())
        });
    }
}

export function successPassword(){
    return{
        type: SUCCESS_PASSWORD
    }
}

export function failedPassword(){
    return{
        type:ERROR_PASSWORD
    }
}

export function resetStatus(){
    return{
        type:RESET_STATUS
    }
}
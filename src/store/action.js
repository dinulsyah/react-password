import { SUCCESS_PASSWORD , ERROR_PASSWORD, RESET_STATUS, SET_ISLOGIN, SET_EMAIL, SET_DATA} from './actionType';
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

export function readPassword(querySnapshot){
    const passwords = [];
    return (dispatch) => {     
        querySnapshot.forEach((doc) => {
            const { url, password, username, createdAt, updatedAt } = doc.data();
            passwords.push({
                    key: doc.id,
                    doc,
                    url,
                    password,
                    username,
                    createdAt,
                    updatedAt
            });
        });
        dispatch(setData(passwords))
    }

}

export function setIsLogin(data) {
    return {
        type: SET_ISLOGIN,
        data
    }
}

export function setEmail(data) {
    return {
        type: SET_EMAIL,
        data
    }
}

export function setData(data) {
    return {
        type: SET_DATA,
        data
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
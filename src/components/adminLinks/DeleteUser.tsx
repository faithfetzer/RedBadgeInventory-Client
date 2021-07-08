import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'

type DeleteUserProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}
type DeleteUserState = {}

class DeleteUser extends React.Component<DeleteUserProps, DeleteUserState>{
    constructor(props: DeleteUserProps){
        super(props)
    }

    render(){
    return(
        <div>
            <p>Delete User</p>
        </div>
    )}
};

export default DeleteUser
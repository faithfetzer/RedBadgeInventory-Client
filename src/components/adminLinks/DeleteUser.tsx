import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'

type DeleteUserProps = {
    // sessionToken: string,
    // adminStatus: boolean,
    // productFeedView: boolean,
    // myAccountView: boolean,
    // adminAccountManager: boolean,
    // myItemView: boolean,
    // myLocationView: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    // updateMyLocationView: () => void,
    // updateMyItemView: () => void,
    // updateMyAccountView: () => void,
    // updateAdminAccount: () => void,
    // notProductView: () => void,
    // productView: () => void,
    // notMyAccountView: () => void,
    // notAdminAccount: () => void,
    // notMyItemView: () => void,
    // notMyLocationView: () => void
}

class DeleteUser extends React.Component<DeleteUserProps, {}>{
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
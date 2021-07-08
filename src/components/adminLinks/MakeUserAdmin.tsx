import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'

type MakeUserAdminProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type MakeUserAdminState = {
    
}
class MakeUserAdmin extends React.Component<MakeUserAdminProps, MakeUserAdminState>{
    constructor(props: MakeUserAdminProps){
        super(props)
    }

    render(){
    return(
        <div>
            <p>Make User Admin</p>
        </div>
    )}
};

export default MakeUserAdmin
import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import {UserInfo} from '../../Interfaces';
import APIURL from '../../helpers/environment'

type ViewAccountProps = {
    sessionToken: string,
    currentUserId: number | undefined
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

type ViewUserInfoState = {
    userInfo: UserInfo
}

class ViewAccount extends React.Component<ViewAccountProps, ViewUserInfoState>{
    constructor(props: ViewAccountProps){
        super(props)
        this.state = {
            userInfo: {
                id: undefined,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: false,
                role: "",
            }
        }
    }

    fetchAccount(){
        let url = `${APIURL}/user/info/${this.props.currentUserId}`
        console.log('fetch account info', url)
        fetch(url,{
            method: 'GET',
            headers: new Headers({
                'Content-type' : 'application/json',
                'Authorization' : this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                this.setState({
                    userInfo: {
                        id: response.user.id,
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        email: response.user.email,
                        password: response.user.password,
                        admin: response.user.admin,
                        role: response.user.role}
                }, () => console.log('state', this.state))
            })
            .catch(err => console.log(err))
    }

    componentWillMount(){
        this.fetchAccount()
    }

    admin(){
        return this.state.userInfo.admin ? 'Yes' : 'No'
    }

    userInfoDisplay(){
        return this.state.userInfo.id !== 0 || undefined  ? 
        <>
        <p>First Name: {this.state.userInfo.firstName}</p>
        <p>Last Name: {this.state.userInfo.lastName}</p>
        <p>Email: {this.state.userInfo.email}</p>
        <p>Role: {this.state.userInfo.role}</p>
        <p>Admin: {this.admin()}</p>
        <button><Link to='/admineditaccount'>Edit Account</Link></button>
        <button><Link to='/admindeleteaccount'>Delete Account</Link></button>
        </> 
        : <></>
    }

    render(){
    return(
        <div>
            <p>ViewAccount</p>
            {this.userInfoDisplay()}
        </div>
    )}
};

export default ViewAccount
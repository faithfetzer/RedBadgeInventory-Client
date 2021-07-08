import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import { UserInfo } from '../../Interfaces';
import APIURL from '../../helpers/environment'

type EditUserInfoProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type EditUserInfoState = {
    email: '',
    userToEdit: UserInfo,
    newUserInfo: UserInfo
}

class EditUserInfo extends React.Component<EditUserInfoProps, EditUserInfoState>{
    constructor(props: EditUserInfoProps){
        super(props)
        this.state = {
            email: '',
            userToEdit: {
                id: undefined,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: "",
            },
            newUserInfo : {
                id: undefined,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: "",
            },
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.userInfoDisplay = this.userInfoDisplay.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        // this.setState({
        //     email: e.target.value
        // })
    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit')
        let urlForId = `${APIURL}/user/idadmin`
        let reqBody = {email: this.state.email}

        // console.log(reqBody)
        fetch(urlForId, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    ...this.state,
                    userToEdit: {
                        id: response.user.id,
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        email: response.user.email,
                        password: response.user.password,
                        admin: response.user.admin,
                        role: response.user.role,
                    }
                })
                console.log('user to edit', this.state.userToEdit);
            })
            .catch(err => console.log(err))
    }

    admin(){
        return this.state.userToEdit.admin ? 'Yes' : 'No'
    }

    userInfoDisplay(){
        // console.log('user id', this.state.userInfo.id)
        return this.state.userToEdit.id === 0 || this.state.userToEdit.id === undefined  ? <></> :
        <>
        <p>First Name: {this.state.userToEdit.firstName}</p>
        <p>Last Name: {this.state.userToEdit.lastName}</p>
        <p>Email: {this.state.userToEdit.email}</p>
        <p>Role: {this.state.userToEdit.role}</p>
        <p>Admin: {this.admin()}</p>
        <p><button><Link to='/adminupdatetoadmin'>Make User Admin</Link></button></p>
        <button>Submit Changes</button>
        </> 
    }


    render(){
    return(
        <div>
                <h3>User Account To Edit:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                    <br />
                    <button type='submit'>Search</button>
                </form>
                {this.userInfoDisplay()}
            </div >
    )}
};

export default EditUserInfo
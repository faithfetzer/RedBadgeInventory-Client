import React from "react";
import { ThisExpression, ThisTypeNode, transpileModule } from "typescript";
import {UserInfo} from '../../Interfaces';
import APIURL from '../../helpers/environment'
import {Button} from '@material-ui/core'

type AuthProps = {
    sessionToken: string,
    userRole: string,
    currentUserId: number | undefined,
    adminStatus: boolean | null,
    updateSessionToken: (newToken: string) => void,
    updateLocalStorage: (newToken: string, role: string, adminStatus: boolean) => void,
    updateUserInfo: (role: string, admin:boolean, userID: number) => void,
    clearLocalStorage: () => void
}

type AuthState = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: boolean,
    role: string
}

class Auth extends React.Component<AuthProps, AuthState>{
    constructor(props: AuthProps){
        super(props)
        this.loginToggle = this.loginToggle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.formFields = this.formFields.bind(this)
    }

    title(): string{
        return this.state.login ? 'Log In' : 'Register for a New Account'
    }

    button(): string {
        return this.state.login ?  'Not registered? Sign up for an account' : 'Already have an account? Log in'
    }

    submitButton(): string{
        return this.state.login ? 'Login' : 'Register'
    }

    loginToggle(){
        this.setState({
            login:  !this.state.login
        })
    }

    formFields(){
        return !this.state.login ?
            <>
            <label htmlFor='firstName'>First Name</label>
            <br/>
            <input type="text" name='firstName' id="firstName" value={this.state.firstName} onChange={this.handleChange}></input>
            <br/>
            <label htmlFor='lastName'>Last Name</label>
            <br/>
            <input type="text" name='lastName' id='lastName'value={this.state.lastName} onChange={this.handleChange}></input>
            <br/>
            <label htmlFor='role'>Role</label>
            <br/>
                <fieldset id='role'>
                    <label htmlFor='maker'>Maker</label>
                    <input type="radio" name='role' id='maker' value='maker' onChange={this.handleChange}/>
                    <label htmlFor='buyer'>Buyer</label>
                    <input type="radio" name='role' id='buyer' value='buyer' onChange={this.handleChange}/>
                </fieldset>
            <br/>
            </> : <></>
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e: any){
        e.preventDefault()
        // console.log('submit')
        let reqBody = this.state.login ? 
            {email : this.state.email, 
            password: this.state.password}
            : {firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role}
        let url = this.state.login ? `${APIURL}/user/login` : `${APIURL}/user/register`

        // console.log(reqBody, url)
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type' : 'application/json'
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                this.props.updateSessionToken(response.token);
                this.props.updateLocalStorage(response.token, response.user.role, response.user.admin);
                this.props.updateUserInfo(response.user.role, response.user.admin, response.user.id);
                // console.log(this.props.sessionToken);
            })
            .catch(err => console.log(err))
    }

    componentWillMount(){
        this.setState({
            login: true,
        })
    }

    render(){
        return(
            <div>
                <br/>
                
                <br/>
                <Button variant="contained" onClick={this.loginToggle}>{this.button()}</Button>
                <h3>{this.title()}</h3>
                <form onSubmit={this.handleSubmit}>
                    {this.formFields()}
                    <label htmlFor='email'>Email</label>
                    <br/>
                    <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                    <br/>
                    <label htmlFor='password'>Password</label>
                    <br/>
                    <input type="text" id='password' name='password' value={this.state.password} onChange={this.handleChange}></input>
                    <br/>
                    <Button variant="contained" type='submit'>{this.submitButton()}</Button>
                </form>
            </div>
        )
    }
}

export default Auth;
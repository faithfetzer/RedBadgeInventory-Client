import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'

type AddLocationProps = {
    sessionToken: string,
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

type AddLocationState= {
    location: LocationInfo
}

class AddLocation extends React.Component<AddLocationProps, AddLocationState>{
    constructor(props: AddLocationProps){
        super(props)
        this.state= {
            location:{
                id: undefined,
                maker_id: undefined,
                name: "",
                url: "",
                address: "",
                notes: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            location: {
            [e.target.name] : e.target.value}} as any)

    }

        
    handleSubmit(e: any){
            e.preventDefault()
            console.log('submit', this.state.location)
            // let reqBody = this.state.login ? 
            //     {email : this.state.email, 
            //     password: this.state.password}
            //     : {firstName: this.state.firstName, 
            //     lastName: this.state.lastName,
            //     email: this.state.email,
            //     password: this.state.password,
            //     role: this.state.role}
            // let url = this.state.login ? `${APIURL}/user/login` : `${APIURL}/user/register`
    
            // // console.log(reqBody, url)
            // fetch(url,{
            //     method: 'POST',
            //     body: JSON.stringify(reqBody),
            //     headers: new Headers({
            //         'Content-type' : 'application/json'
            //     })
            // })
            //     .then(response => response.json())
            //     .then((response) => {
            //         // console.log('response', response);
            //         this.props.updateSessionToken(response.token);
            //         this.props.updateLocalStorage(response.token);
            //         this.props.updateUserInfo(response.user.role, response.user.admin);
            //         // console.log(this.props.sessionToken);
            //     })
            //     .catch(err => console.log(err))
        }

    render(){
    return(
        <div>
            <p>Add Location</p>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Location Name</label>
                <br/>
                <input type="string" id='name' name='name' value={this.state.location.name} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='url'>URL</label>
                <br/>
                <input type="string" id='url' name='url' value={this.state.location.url} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='address'>Address</label>
                <br/>
                <input type="string" id='address' name='address' value={this.state.location.address} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='notes'>Notes</label>
                <br/>
                <input type="string" id='notes' name='notes' value={this.state.location.notes} onChange={this.handleChange}></input>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )}
};

export default AddLocation
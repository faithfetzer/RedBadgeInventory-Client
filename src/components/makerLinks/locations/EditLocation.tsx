import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route,
    useParams
    } from 'react-router-dom';
import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'
import {Button} from '@material-ui/core'

// PUT /locations/update/:id const {name, url, address, notes} = req.body

type EditLocationProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    changeEditView: () => void,
    setLocationToChange: (id: number | null) => void
}

type EditLocationState = {
    location: LocationInfo,
    newLocation: LocationInfo
}

class EditLocation extends React.Component<EditLocationProps, EditLocationState>{
    constructor(props: EditLocationProps){
        super(props)
        this.state= {
            location:{
                id: undefined,
                name: "",
                url: "",
                address: "",
                notes: "",
                userId: undefined
            },
            newLocation: {
                id: this.state.location.id,
                name: "",
                url: "",
                address: "",
                notes: "",
                userId: undefined
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e: any){
        e.preventDefault()
        console.log('submit', this.state.location)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            newLocation: {
            [e.target.name] : e.target.value}} as any)

    }

    render(){
    return(
        <div>
            <p>Edit Location</p>
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
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )}
};

export default EditLocation
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

type DeleteLocationProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    changeDeleteView: () => void,
    setLocationToChange: (id: number | null) => void
}

type DeleteLocationState={
    location: LocationInfo
}

class DeleteLocation extends React.Component<DeleteLocationProps, DeleteLocationState>{
    constructor(props: DeleteLocationProps){
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
    }

    handleSubmit(){

    }
    
    render(){
    return(
        <div>
            <p>Delete Location</p>
        </div>
    )}
};

export default DeleteLocation
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
import {Delete, Clear} from '@material-ui/icons'

// DELETE /locations/delete/:id

type DeleteLocationProps = {
    sessionToken: string,
    currentUserId: number | undefined,
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
                name: "",
                url: "",
                address: "",
                notes: "",
                userId: this.props.currentUserId
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
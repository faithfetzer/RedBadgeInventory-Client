import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'
import EditLocation from './EditLocation'
import DeleteLocation from './DeleteLocation'

type ViewLocationProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type ViewLocationState = {
    myLocations: LocationInfo[],
    editLocationView: boolean,
    deleteLocationView: boolean,
    locationToChange: number | null
}

class ViewLocation extends React.Component<ViewLocationProps, ViewLocationState>{
    constructor(props: ViewLocationProps) {
        super(props)
        this.state = {
            myLocations: [],
            editLocationView: false,
            deleteLocationView: false,
            locationToChange: null
        }
    }

    fetchMyItems() {
        let url = `${APIURL}/locations/`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                this.setState({
                    myLocations: response.myLocations
                }, () => console.log(this.state.myLocations))
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchMyItems()
    }

    mapProducts() {
        if (this.state.myLocations.length > 0) {
            return this.state.myLocations.map((locations, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td>{locations.name}</td>
                            <td>{locations.url}</td>
                            <td>{locations.address}</td>
                            <td>{locations.notes}</td>
                            <td><button onClick={this.changeEditView}>Edit</button></td>
                            <td><button onClick={this.changeDeleteView}>Delete</button></td>
                        </tr>
                    </>
                )
            })
        } else {
            return <><tr><td colSpan={4}>No Listing Locations Currently. <Link to='/addmylocations'>Add One!</Link></td></tr></>
        }
    }

    setLocationToChange(id: number | null){
        this.setState({
            locationToChange: id
        })
    }

    changeEditView = () =>{
        this.setState({
            editLocationView: !this.state.editLocationView
        })
    }

    changeDeleteView =() => {
        this.setState({
            deleteLocationView: !this.state.deleteLocationView
        })
    }

    editLocationView(){
        return(
            <div>
                <button onClick={this.changeEditView}>Cancel</button>
                <EditLocation sessionToken={this.props.sessionToken} changeEditView={this.changeEditView} setLocationToChange={this.setLocationToChange}/>
            </div>
        )
    }

    deleteLocationView(){
        return(
            <div>
                <button onClick={this.changeDeleteView}>Cancel</button>
                <DeleteLocation sessionToken={this.props.sessionToken} changeDeleteView={this.changeDeleteView} setLocationToChange={this.setLocationToChange}/>
            </div>
        )
    }

    viewController(){
        if(this.state.editLocationView){
            return <>{this.editLocationView()}</>
        } else if(this.state.deleteLocationView){
            return <>{this.deleteLocationView()}</>
        } else {
            return(
            <>
            <button><Link to='/addmylocations'>Add a Listing Location</Link></button>
                <table>
                    <thead>
                        <tr>
                            <th>Location Name</th>
                            <th>URL</th>
                            <th>Address</th>
                            <th>Notes</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.mapProducts()}</tbody>
                </table>
                </>
            )
        }
    }

    render() {
        return (
            <div>
                {this.viewController()}
            </div>
        )
    }
};

export default ViewLocation
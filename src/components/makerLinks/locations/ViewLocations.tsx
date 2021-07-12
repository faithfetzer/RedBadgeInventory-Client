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
import { Button } from '@material-ui/core'
import { Delete, Clear } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


interface ViewLocationProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
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

const styles = () => createStyles({
})

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

    fetchMyLocations() {
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
        this.fetchMyLocations()
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
                            <td><Button variant="contained" onClick={() => { this.changeEditView(); this.setLocationToChange(locations.id) }}>Edit</Button></td>
                            <td><Button variant="contained" color="secondary" onClick={() => { this.changeDeleteView(); this.setLocationToChange(locations.id) }}><Delete />Delete</Button></td>
                        </tr>
                    </>
                )
            })
        } else {
            return <><tr><td colSpan={4}>No Listing Locations Currently. <Link to='/addmylocations'>Add One!</Link></td></tr></>
        }
    }

    setLocationToChange(id: number | null) {
        this.setState({
            locationToChange: id
        })
    }

    changeEditView = () => {
        this.setState({
            editLocationView: !this.state.editLocationView
        })
    }

    changeDeleteView = () => {
        this.setState({
            deleteLocationView: !this.state.deleteLocationView
        })
    }

    editLocationView() {
        return (
            <div>
                <Button variant="contained" onClick={this.changeEditView}><Clear />Cancel</Button>
                <EditLocation sessionToken={this.props.sessionToken} changeEditView={this.changeEditView} setLocationToChange={this.setLocationToChange} locationToChange={this.state.locationToChange} />
            </div>
        )
    }

    deleteLocationView() {
        return (
            <div>
                <Button variant="contained" onClick={this.changeDeleteView}><Clear />Cancel</Button>
                <DeleteLocation currentUserId={this.props.currentUserId} sessionToken={this.props.sessionToken} changeDeleteView={this.changeDeleteView} setLocationToChange={this.setLocationToChange} locationToChange={this.state.locationToChange} />
            </div>
        )
    }

    viewController() {
        if (this.state.editLocationView) {
            return <>{this.editLocationView()}</>
        } else if (this.state.deleteLocationView) {
            return <>{this.deleteLocationView()}</>
        } else {
            return (
                <>
                    <Button variant="contained"><Link to='/addmylocations'>Add a Listing Location</Link></Button>
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
        const { classes } = this.props

        return (
            <div>
                <h2>Listing Locations</h2>
                {this.viewController()}
            </div>
        )
    }
};

export default withStyles(styles)(ViewLocation)
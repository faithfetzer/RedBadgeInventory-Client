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
import { Button } from '@material-ui/core'
import { Delete, Clear } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


// DELETE /locations/delete/:id

interface DeleteLocationProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
    locationToChange: number | null
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    changeDeleteView: () => void,
    setLocationToChange: (id: number | null) => void
}

type DeleteLocationState = {
    location: LocationInfo
}

const styles = () => createStyles({
})

class DeleteLocation extends React.Component<DeleteLocationProps, DeleteLocationState>{
    constructor(props: DeleteLocationProps) {
        super(props)
        this.state = {
            location: {
                id: this.props.locationToChange,
                name: "",
                url: "",
                address: "",
                notes: "",
                userId: this.props.currentUserId
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.location)
        let url = `${APIURL}/locations/delete/${this.props.locationToChange}`

        console.log(url, this.props.sessionToken)
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.setLocationToChange(null)
                this.props.changeDeleteView()
                // this.success()
                console.log(response)
            })
            .catch(err => {
                console.log(err)
                // this.failure(err)
            })
    }

    fetchThisLocation() {
        let url = `${APIURL}/locations`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                if (this.props.locationToChange) {
                    for (let i = 0; i < response.myLocations.length; i++) {
                        if (response.myLocations[i].id === this.props.locationToChange) {
                            console.log('yes', response.myLocations[i])
                            this.setState({
                                location: response.myLocations[i],
                            }, () => console.log(this.state.location))
                        }
                        else {
                            console.log('no', response.myLocations)
                        }
                    }
                }
                else { console.log('no locations', response.myLocations) }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchThisLocation()
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <Button variant="contained" onClick={this.props.changeDeleteView}><Clear/></Button>
                <h2>Delete Location</h2>
                <p>{this.state.location.name}</p>
                <Button variant="contained" onClick={this.handleSubmit}><Delete/>Delete Location</Button>
            </div>
        )
    }
};

export default withStyles(styles)(DeleteLocation)
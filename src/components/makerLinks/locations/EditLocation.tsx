import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


// PUT /locations/update/:id const {name, url, address, notes} = req.body

interface EditLocationProps extends WithStyles<typeof styles> {
    sessionToken: string,
    locationToChange: number | null
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    fetchMyLocations: () => void,
    changeEditView: () => void,
    setLocationToChange: (id: number | null) => void
}

type EditLocationState = {
    location: LocationInfo,
    newLocation: LocationInfo
}

const styles = () => createStyles({
})

class EditLocation extends React.Component<EditLocationProps, EditLocationState>{
    constructor(props: EditLocationProps) {
        super(props)
        this.state = {
            location: {
                id: null,
                name: "",
                url: "",
                address: "",
                notes: "",
                userId: undefined
            },
            newLocation: {
                id: null,
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

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.location)
        let reqBody = {
            name: this.state.newLocation.name,
            url: this.state.newLocation.url,
            address: this.state.newLocation.address,
            notes: this.state.newLocation.notes
        }
        let url = `${APIURL}/locations/update/${this.props.locationToChange}`

        console.log(reqBody, url, this.props.sessionToken)
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then((response) => response.json())
            .then((response) => {
                // this.props.setLocationToChange(null)
                // this.props.fetchMyLocations()
                this.props.changeEditView()
                // this.success()
                console.log(response)
            })
            .catch(err => {
                console.log(err)
                // this.failure(err)
            })
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            newLocation: {
                ...this.state.newLocation,
                [e.target.name]: e.target.value
            }
        } as any,
            () => console.log(this.state.newLocation))

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
                                newLocation: response.myLocations[i]
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
                <h2>Edit Location</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Location Name</label>
                    <br />
                    <input type="string" id='name' name='name' value={this.state.newLocation.name} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='url'>URL</label>
                    <br />
                    <input type="string" id='url' name='url' value={this.state.newLocation.url} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='address'>Address</label>
                    <br />
                    <input type="string" id='address' name='address' value={this.state.newLocation.address} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='notes'>Notes</label>
                    <br />
                    <input type="string" id='notes' name='notes' value={this.state.newLocation.notes} onChange={this.handleChange}></input>
                    <br />
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(EditLocation)
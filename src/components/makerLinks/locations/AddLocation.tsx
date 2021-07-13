import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


// POST /locations/add const { name, url, address, notes } = req.body

interface AddLocationProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type AddLocationState = {
    location: LocationInfo
}

const styles = () => createStyles({
})

class AddLocation extends React.Component<AddLocationProps, AddLocationState>{
    constructor(props: AddLocationProps) {
        super(props)
        this.state = {
            location: {
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

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            location: {
                ...this.state.location,
                [e.target.name]: e.target.value
            }
        } as any)

    }


    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.location)
        let reqBody = {
            name: this.state.location.name,
            url: this.state.location.url,
            address: this.state.location.address,
            notes: this.state.location.notes
        }

        let url = `${APIURL}/locations/add`

        console.log(reqBody, url)
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                // console.log(this.props.sessionToken);
            })
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h2>Add Location</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Location Name</label>
                    <br />
                    <input type="string" id='name' name='name' value={this.state.location.name} onChange={this.handleChange} required></input>
                    <br />
                    <label htmlFor='url'>URL</label>
                    <br />
                    <input type="string" id='url' name='url' value={this.state.location.url} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='address'>Address</label>
                    <br />
                    <input type="string" id='address' name='address' value={this.state.location.address} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='notes'>Notes</label>
                    <br />
                    <input type="string" id='notes' name='notes' value={this.state.location.notes} onChange={this.handleChange}></input>
                    <br />
                    <Button variant="contained" type="submit">Submit</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(AddLocation)
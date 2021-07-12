import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import APIURL from '../../helpers/environment'
import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

interface DeleteAccountProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
    adminStatus: boolean | null,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type DeleteAccountState = {
    emailEntered: string
}

const styles = () => createStyles({
})

class DeleteAccount extends React.Component<DeleteAccountProps, DeleteAccountState>{
    constructor(props: DeleteAccountProps) {
        super(props)
        this.state = {
            emailEntered: ''
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            emailEntered: e.target.value
        })
    }

    handleDelete(e: any) {
        e.preventDefault()
        // console.log('submit')
        let url = `${APIURL}/user/delete/${this.props.currentUserId}`
        let reqBody = { email: this.state.emailEntered }
        console.log(reqBody, url)
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                this.success()
                this.props.clearLocalStorage();
            })
            .catch(err => {
                console.log(err)
                this.failure(err)
            })
    }

    success() {
        alert("account deleted")
    }

    failure(error: string) {
        alert(`error: unable to update account ${error}`)
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h2>Delete Your Account</h2>
                <Link to='/viewmyaccount'>Cancel</Link>
                <br />
                <strong>THIS IS PERMANENT AND CANNOT BE UNDONE</strong>
                <form onSubmit={this.handleDelete}>
                    <label htmlFor='email'>Enter Your Email To Confirm</label>
                    <br />
                    <input type="email" id='email' name='email' value={this.state.emailEntered} onChange={this.handleChange}></input>
                    <br />
                    <Button variant="contained" color="secondary" type="submit"><Delete />Delete Account</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(DeleteAccount)
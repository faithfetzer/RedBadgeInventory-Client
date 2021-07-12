import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import APIURL from '../../helpers/environment'
import { Button } from '@material-ui/core';
import { Clear, Delete } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


interface DeleteUserProps extends WithStyles<typeof styles> {
    sessionToken: string,
    userEmail: string,
    userID: number | undefined
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}
type DeleteUserState = { emailEntered: string }

const styles = () => createStyles({})

class DeleteUser extends React.Component<DeleteUserProps, DeleteUserState>{
    constructor(props: DeleteUserProps) {
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
        let url = `${APIURL}/user/delete/${this.props.userID}`
        let reqBody = { email: this.state.emailEntered }
        console.log(reqBody, url)
        if (this.props.userEmail === this.state.emailEntered) {
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
                })
                .catch(err => {
                    console.log(err)
                    this.failure(err)
                })
        }
        else {
            alert("Emails do not match")
        }
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
                <h2>Delete User Account</h2>
                {this.props.userEmail}
                <br />
                <strong>THIS IS PERMANENT AND CANNOT BE UNDONE</strong>
                <form onSubmit={this.handleDelete}>
                    <label htmlFor='email'>Re-enter Email Address To Confirm</label>
                    <br />
                    <input type="email" id='email' name='email' value={this.state.emailEntered} onChange={this.handleChange}></input>
                    <br />
                    <Button variant="contained" color="secondary" type="submit"><Delete />Delete Account</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(DeleteUser)
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import APIURL from '../../helpers/environment'
import { UserInfo } from '../../Interfaces';
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


interface EditAccountProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
    adminStatus: boolean | null,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin: boolean, userID: number) => void,
}

type EditAccountState = {
    user: UserInfo,
    newUser: UserInfo
}

const styles = () => createStyles({
})

class EditAccount extends React.Component<EditAccountProps, EditAccountState>{
    constructor(props: EditAccountProps) {
        super(props)
        this.state = {
            user: {
                id: this.props.currentUserId,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: ""
            },
            newUser: {
                id: undefined,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [e.target.name]: e.target.value
            }
        } as any, () => console.log(this.state.newUser))
    }

    fetchAccount() {
        let url = `${APIURL}/user/info/${this.props.currentUserId}`
        console.log('fetch account info', url)
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
                this.props.updateUserInfo(response.user.role, response.user.admin, response.user.id);
                this.setState({
                    user: {
                        id: response.user.id,
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        email: response.user.email,
                        password: response.user.password,
                        admin: response.user.admin,
                        role: response.user.role
                    },
                    newUser: {
                        id: response.user.id,
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        email: response.user.email,
                        password: response.user.password,
                        admin: response.user.admin,
                        role: response.user.role
                    }
                }, () => console.log('state', this.state))
            })
            .catch(err => console.log(err))
    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.newUser)
        let reqBody = {
            firstName: this.state.newUser.firstName,
            lastName: this.state.newUser.lastName,
            email: this.state.newUser.email,
            role: this.state.newUser.role
        }
        let url = `${APIURL}/user/update/${this.props.currentUserId}`

        console.log(reqBody, url)
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
                this.fetchAccount()
                // this.success()
                console.log(response)
            })
            .catch(err => {
                console.log(err)
                // this.failure(err)
            })
    }

    success() {
        alert("account updated")
    }

    failure(error: string) {
        alert(`error: unable to update account ${error}`)
    }

    componentDidMount() {
        this.fetchAccount()
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h2>Edit Your Account</h2>
                <Link to='/viewmyaccount'>Cancel</Link>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <br />
                    ({this.state.user.firstName})
                    <br />
                    <input type="text" name='firstName' id="firstName" placeholder={this.state.user.firstName} value={this.state.newUser.firstName} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='lastName'>Last Name</label>
                    <br />
                    ({this.state.user.lastName})
                    <br />
                    <input type="text" name='lastName' id='lastName' placeholder={this.state.user.lastName} value={this.state.newUser.lastName} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='role'>Role</label>
                    <br />
                    ({this.state.user.role})
                    <br />
                    <fieldset id='role'>
                        <label htmlFor='maker'>Maker</label>
                        <input type="radio" name='role' id='maker' value='maker' onChange={this.handleChange} />
                        <label htmlFor='buyer'>Buyer</label>
                        <input type="radio" name='role' id='buyer' value='buyer' onChange={this.handleChange} />
                    </fieldset>
                    <label htmlFor='email'>Email</label>
                    <br />
                    ({this.state.user.email})
                    <br />
                    <input type="email" id='email' name='email' placeholder={this.state.user.email} value={this.state.newUser.email} onChange={this.handleChange}></input>
                    <br />
                    <br />
                    <Button variant="contained" type='submit'>Save Changes</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(EditAccount)
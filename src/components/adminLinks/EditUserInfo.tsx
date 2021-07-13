import React from 'react'
import { UserInfo } from '../../Interfaces';
import APIURL from '../../helpers/environment'
import MakeUserAdmin from './MakeUserAdmin'
import { Check, Clear } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


interface EditUserInfoProps extends WithStyles<typeof styles> {
    sessionToken: string,
    userEmail: string,
    userID: number | undefined
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type EditUserInfoState = {
    email: '',
    userToEdit: UserInfo,
    newUserInfo: UserInfo,
    updateAdminStatus: boolean
}

const styles = () => createStyles({})

class EditUserInfo extends React.Component<EditUserInfoProps, EditUserInfoState>{
    constructor(props: EditUserInfoProps) {
        super(props)
        this.state = {
            email: '',
            userToEdit: {
                id: this.props.userID,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: "",
            },
            newUserInfo: {
                id: this.props.userID,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: "",
            },
            updateAdminStatus: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.fetchAccount = this.fetchAccount.bind(this)
        this.adminStatusToggle = this.adminStatusToggle.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            newUserInfo: {
                ...this.state.newUserInfo,
                [e.target.name]: e.target.value
            } as any
        }, () => console.log(this.state.newUserInfo))
    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.newUserInfo)
        let reqBody = {
            firstName: this.state.newUserInfo.firstName,
            lastName: this.state.newUserInfo.lastName,
            email: this.state.newUserInfo.email,
            role: this.state.newUserInfo.role
        }
        let url = `${APIURL}/user/update/${this.props.userID}`

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

    admin() {
        return this.state.userToEdit.admin ? <Check /> : <Clear />
    }

    fetchAccount() {
        let url = `${APIURL}/user/info/${this.props.userID}`
        console.log('fetch user info', url)
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
                    userToEdit: response.user,
                    newUserInfo: response.user
                }, () => console.log('state', this.state))
            })
            .catch(err => console.log(err))
    }



    success() {
        alert("account updated")
    }

    failure(error: string) {
        alert(`error: unable to update account ${error}`)
    }

    button() {
        return this.state.updateAdminStatus ? <><Clear /></> : 'Update User Admin Access'
    }
    adminStatusToggle() {
        this.setState({
            updateAdminStatus: !this.state.updateAdminStatus
        })
    }

    adminStatus() {
        return this.state.updateAdminStatus ? <><MakeUserAdmin userAdminStatus={this.state.userToEdit.admin} sessionToken={this.props.sessionToken} userEmail={this.state.userToEdit.email} fetchAccount={this.fetchAccount} /></> : <></>
    }

    componentDidMount() {
        this.fetchAccount()
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h2>Edit User's Account Infomation</h2>
                <p>(current information)</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <br />
                    ({this.state.userToEdit.firstName})
                    <br />
                    <input type="text" name='firstName' id="firstName" placeholder={this.state.userToEdit.firstName} value={this.state.newUserInfo.firstName} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='lastName'>Last Name</label>
                    <br />
                    ({this.state.userToEdit.lastName})
                    <br />
                    <input type="text" name='lastName' id='lastName' placeholder={this.state.userToEdit.lastName} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='role'>Role</label>
                    <br />
                    ({this.state.userToEdit.role})
                    <br />
                    <fieldset id='role' placeholder={this.state.userToEdit.role}>
                        <label htmlFor='maker'>Maker</label>
                        <input type="radio" name='role' id='maker' value='maker' onChange={this.handleChange} />
                        <label htmlFor='buyer'>Buyer</label>
                        <input type="radio" name='role' id='buyer' value='buyer' onChange={this.handleChange} />
                    </fieldset>
                    <label htmlFor='email'>Email</label>
                    <br />
                    ({this.state.userToEdit.email})
                    <br />
                    <input type="email" id='email' name='email' placeholder={this.state.userToEdit.email} onChange={this.handleChange}></input>
                    <br />
                    <br />
                    <Button variant="contained" type='submit'>Save Changes</Button>
                </form>
                <Button variant="contained" size="small" onClick={this.adminStatusToggle}>{this.button()}</Button>
                {this.adminStatus()}


            </div >
        )
    }
};

export default withStyles(styles)(EditUserInfo)
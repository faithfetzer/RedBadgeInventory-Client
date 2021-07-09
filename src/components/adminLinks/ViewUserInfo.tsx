import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import {Modal, ModalBody} from 'reactstrap'
import {Check, Clear} from '@material-ui/icons'
import React from 'react'
import { UserInfo } from '../../Interfaces';
import APIURL from '../../helpers/environment'
import EditUserInfo from './EditUserInfo'
import DeleteUser from './DeleteUser'

type ViewUserInfoProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type ViewUserInfoState = {
    email: string,
    userInfo: UserInfo,
    openEdit: boolean,
    openDelete: boolean
}

class ViewUserInfo extends React.Component<ViewUserInfoProps, ViewUserInfoState>{
    constructor(props: ViewUserInfoProps) {
        super(props)
        this.state = {
            email: '',
            userInfo: {
                id: undefined,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: "",
            },
            openEdit: false,
            openDelete: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.userInfoDisplay = this.userInfoDisplay.bind(this)
        this.handleCloseDelete =this.handleCloseDelete.bind(this)
        this.handleCloseEdit = this.handleCloseEdit.bind(this)
        this.handleOpenDelete = this.handleOpenDelete.bind(this)
        this.handleOpenEdit = this.handleOpenEdit.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit')
        let urlForId = `${APIURL}/user/idadmin`
        let reqBody = { email: this.state.email }

        // console.log(reqBody)
        fetch(urlForId, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    ...this.state,
                    userInfo: {
                        id: response.user.id,
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        email: response.user.email,
                        password: response.user.password,
                        admin: response.user.admin,
                        role: response.user.role,
                    }
                })
                console.log('response view user info', this.state.userInfo);
            })
            .catch(err => console.log(err))
    }

    admin() {
        return this.state.userInfo.admin ? <Check/> : <Clear/>
    }

    userInfoDisplay() {
        // console.log('user id', this.state.userInfo.id)
        return this.state.userInfo.id === 0 || this.state.userInfo.id === undefined ? <></> :
            <>
                <p>First Name: {this.state.userInfo.firstName}</p>
                <p>Last Name: {this.state.userInfo.lastName}</p>
                <p>Email: {this.state.userInfo.email}</p>
                <p>Role: {this.state.userInfo.role}</p>
                <p>Admin: {this.admin()}</p>
                <button type="button" onClick={this.handleOpenEdit}>Edit Account</button>
                <button type="button" onClick={this.handleOpenDelete}>Delete Account</button>
            </>
    }

    handleOpenEdit() {
        console.log('open edit')
        this.setState({
            openEdit: true
        })
    }
    handleOpenDelete() {
        console.log('open delete')
        this.setState({
            openDelete: true
        })
    }

    handleCloseEdit() {
        console.log('close edit')
        this.setState({
            openEdit: false
        })
    }

    handleCloseDelete() {
        console.log('close delete')

        this.setState({
            openDelete: false
        })
    }

    render() {
        return (
            <div>
                <h3>Search for User Info By Email</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <br />
                    <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                    <br />
                    <button type='submit'>Search</button>
                </form>
                {this.userInfoDisplay()}
                <Modal isOpen={this.state.openEdit}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description" className={'modal-dialog-centered'}>
                        <ModalBody>
                        <button onClick={this.handleCloseEdit}>Cancel</button>
                        <EditUserInfo sessionToken={this.props.sessionToken} userEmail={this.state.userInfo.email} userID={this.state.userInfo.id}/></ModalBody>
                        </Modal>
                    <Modal isOpen={this.state.openDelete}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"><ModalBody>
                            <button onClick={this.handleCloseDelete}>Cancel</button>
                            <DeleteUser sessionToken={this.props.sessionToken} userEmail={this.state.userInfo.email} userID={this.state.userInfo.id} /></ModalBody></Modal>
            </div >
                )
    }
};

                export default ViewUserInfo
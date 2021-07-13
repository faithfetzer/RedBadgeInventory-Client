import { Button } from '@material-ui/core';
import { Check, Clear, Delete } from '@material-ui/icons'
import React from 'react'
import { UserInfo } from '../../Interfaces';
import APIURL from '../../helpers/environment'
import EditUserInfo from './EditUserInfo'
import DeleteUser from './DeleteUser'
import { createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface ViewUserInfoProps extends WithStyles<typeof styles> {
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
    openDelete: boolean,
    responseStatus: number | undefined
}

const styles = () => createStyles({
    sidebarListStyling: {
        minHeight: '100vh',
        
    },
    mainDiv: {
        '& h2' :{
            color: '#30011E'
        }
    },
    searchInfo: {
        
    },
    modal: {
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'grey',
        border: '2px solid #000',
        borderRadius: 10,
        padding: '10px',
        '& Button' :{
            margin: '5px'
        },
        '& fieldset' :{
            border: "none"
        }, 
    },

});

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
            openDelete: false,
            responseStatus: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.userInfoDisplay = this.userInfoDisplay.bind(this)
        this.toggleDelete = this.toggleDelete.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
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
        this.fetchAccountInfo()
    }

    fetchAccountInfo() {
        let urlForId = `${APIURL}/user/idadmin`
        let reqBody = { email: this.state.email }

        console.log(reqBody)
        fetch(urlForId, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            // if (!response.ok) {
            //     this.setState({
            //         responseStatus: response.status
            //     }, () => console.log(this.state.responseStatus))
            // }
            // else{
            // }
            .then((response) => {
                console.log('response', response)
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
            })
            .catch(err => console.log(err))
    }

    handleResponse() {
        console.log(this.state.responseStatus)
    }

    admin() {
        return this.state.userInfo.admin ? <Check /> : <Clear />
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
                <Button variant="contained" type="button" onClick={this.toggleEdit}>Edit Account</Button>
                <Button variant="contained" color="secondary" type="button" onClick={this.toggleDelete}><Delete />Delete</Button>
            </>
    }

    toggleEdit() {
        console.log('open edit')
        this.setState({
            openEdit: !this.state.openEdit
        })
    }

    toggleDelete() {
        console.log('open delete')
        this.setState({
            openDelete: !this.state.openDelete
        })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.mainDiv}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.openEdit}
                    onClose={this.toggleEdit}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={this.state.openEdit}>
                        <div className={classes.modalContent}>
                        <Button variant="contained" onClick={this.toggleEdit}><Clear /></Button>
                        <EditUserInfo sessionToken={this.props.sessionToken} userEmail={this.state.userInfo.email} userID={this.state.userInfo.id} />
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.openDelete}
                    onClose={this.toggleDelete}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={this.state.openDelete}>
                        <div className={classes.modalContent}>
                        <Button variant="contained" onClick={this.toggleDelete}><Clear /></Button>
                        <DeleteUser sessionToken={this.props.sessionToken} userEmail={this.state.userInfo.email} userID={this.state.userInfo.id} />
                        </div>
                    </Fade>
                </Modal>

                {/* <Modal isOpen={this.state.openDelete}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description" className={classes.modal}>
                    <ModalHeader>
                        <Button variant="contained" onClick={this.toggleDelete}><Clear /></Button></ModalHeader>
                    <ModalBody>
                        <DeleteUser sessionToken={this.props.sessionToken} userEmail={this.state.userInfo.email} userID={this.state.userInfo.id} /></ModalBody>
                </Modal> */}
                <div className={classes.searchInfo}>
                    <h2>Search for User Info By Email</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='email'>Email</label>
                        <br />
                        <input type="email" id='email' name='email' value={this.state.email} onChange={this.handleChange}></input>
                        <br />
                        <Button variant="contained" type='submit'>Search</Button>
                    </form>
                    {this.userInfoDisplay()}
                </div>
            </div >
        )
    }
};

export default withStyles(styles)(ViewUserInfo)

// 'modal-dialog-centered'
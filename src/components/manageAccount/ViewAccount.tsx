import {
    Link,
} from 'react-router-dom';
import React from 'react'
import { Check, Clear, Delete } from '@material-ui/icons'
import { UserInfo } from '../../Interfaces';
import APIURL from '../../helpers/environment'
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

interface ViewAccountProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined
    adminStatus: boolean | null,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin: boolean, userID: number) => void
}

type ViewUserInfoState = {
    userInfo: UserInfo,
}
const styles = () => createStyles({
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
    },
})

class ViewAccount extends React.Component<ViewAccountProps, ViewUserInfoState>{
    constructor(props: ViewAccountProps) {
        super(props)
        this.state = {
            userInfo: {
                id: undefined,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                admin: null,
                role: ""
            }
        }
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
                    userInfo: {
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

    componentDidMount() {
        this.fetchAccount()
    }

    componentDidUpdate() {
    }

    admin() {
        return this.state.userInfo.admin ? <Check /> : <Clear />
    }

    userInfoDisplay() {
        return this.state.userInfo.id !== 0 || undefined ?
            <>
                <p>First Name: {this.state.userInfo.firstName}</p>
                <p>Last Name: {this.state.userInfo.lastName}</p>
                <p>Email: {this.state.userInfo.email}</p>
                <p>Role: {this.state.userInfo.role}</p>
                <p>Admin: {this.admin()}</p>
                    <Button variant="contained" size="small"><Link to='/editmyaccount' style={{ textDecoration: 'none' }}>Edit</Link></Button>
                    <Button variant="contained" size="small" color="secondary"><Link to='/deletemyaccount' style={{ textDecoration: 'none' }}><Delete/>Delete</Link></Button>
            </>
            : <></>
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h2>ViewAccount</h2>
                {this.userInfoDisplay()}
            </div>
        )
    }
};

export default withStyles(styles)(ViewAccount)
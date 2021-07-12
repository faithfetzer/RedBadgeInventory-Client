import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import { Button } from '@material-ui/core'
import { Input, Form, Label, InputGroup } from 'reactstrap'
import APIURL from '../../helpers/environment'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


interface MakeUserAdminProps extends WithStyles<typeof styles> {
    sessionToken: string,
    userEmail: string,
    userAdminStatus: boolean | null,
    fetchAccount: () => void,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type MakeUserAdminState = {
    newAdminStatus: boolean | null
}

const styles = () => createStyles({})

class MakeUserAdmin extends React.Component<MakeUserAdminProps, MakeUserAdminState>{
    constructor(props: MakeUserAdminProps) {
        super(props)
        this.state = {
            newAdminStatus: this.props.userAdminStatus
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let returnValue: boolean
        if (e.target.value === 'true') {
            returnValue = true
        } else {
            returnValue = false
        }
        this.setState({
            newAdminStatus: returnValue
        })
    }


    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.newAdminStatus)
        let reqBody = {
            email: this.props.userEmail,
            admin: this.state.newAdminStatus
        }
        let url = `${APIURL}/user/admin`

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
                this.props.fetchAccount()
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <Form>
                    <h2>Admin Status</h2>
                    <InputGroup id="adminStatus">
                        <Label htmlFor='true'>True</Label>
                        <Input value="true" id="true" type='radio' label="True" onChange={this.handleChange} />
                        <Label htmlFor='false'>False</Label>
                        <Input value="false" id="false" type='radio' label="False" onChange={this.handleChange} />
                        <br />
                        <Button variant="contained" onClick={this.handleSubmit}>Save</Button>
                    </InputGroup>
                </Form>
            </div>
        )
    }
};

export default withStyles(styles)(MakeUserAdmin);
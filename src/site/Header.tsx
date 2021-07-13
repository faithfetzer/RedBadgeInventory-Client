import React from 'react'
import { Button } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

interface HeaderProps extends WithStyles<typeof styles> {
    sessionToken: string,
    userRole: string,
    adminStatus: boolean | null,
    currentUserId: number | undefined,
    updateSessionToken: (newToken: string) => void,
    clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin: boolean, userID: number) => void,
}

type HeaderState = {

}

const styles = () => createStyles({
    logout: {
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '0px 10px 10px 10px'
    }
})

class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps) {
        super(props)
    }


    render() {
        const { classes } = this.props
        return (

            <div className={classes.logout}>
                <Button variant="contained" size="small" color="secondary" onClick={this.props.clearLocalStorage}><ExitToApp />Log Out</Button>
            </div>
        )
    }
};

export default withStyles(styles)(Header)
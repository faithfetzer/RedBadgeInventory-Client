import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import {Button} from '@material-ui/core'
import {ExitToApp} from '@material-ui/icons'
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles'



type HeaderProps = {
    sessionToken: string,
    userRole: string,
    adminStatus: boolean | null,
    currentUserId: number | undefined,
    updateSessionToken: (newToken: string) => void,
    clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin:boolean, userID: number) => void,
    }

type HeaderState = {

}

class Header extends React.Component<HeaderProps, {}>{
    constructor(props: HeaderProps){
        super(props)
    }

    // adminButton(){
    //     return this.props.adminStatus ? <><button onClick={this.props.updateAdminAccount}>Admin User Management</button></> : <></>
    // }

    // manageMyAccount(){
    //     return !this.props.myAccountView ? <><button onClick={this.props.updateMyAccountView}>Manage My Account</button></> : <></>
    // }

    // productFeed(){
    //     return !this.props.productFeedView ? <><button onClick={this.props.notProductView}>View Product Feed</button></> : <></>
    // }

    // makerButtons(){
    //     return this.props.userRole == 'maker' ? <><button onClick={this.props.updateMyItemView}>View My Inventory</button><button onClick={this.props.updateMyLocationView}>View My Listing Locations</button></> : <></>
    // }

    // adminLink(){

    // }

    // makerLink(){

    // }

    render(){
    return(
        <div>
            {/* {this.adminButton()} */}
            {/* {this.manageMyAccount()} */}
            {/* {this.makerButtons()}    */}
            {/* {this.productFeed()} */}
            <Button variant="contained" color="secondary" onClick={this.props.clearLocalStorage}><ExitToApp/>Log Out</Button>
            {/* <Router>
                <Link to='managemyaccount'>Manage My Account</Link>
                <Link to='productfeed'>Product Feed</Link>
                <Link to='myitems'></Link>
                <Link to='editmyaccount'></Link>
                <Link to='deletemyaccount'></Link>
                <Link to='mylocations'></Link>
                <Link to='editmyitems'></Link>
                <Link to='addmylocations'></Link>
                <Link to='addmyitems'></Link>
                <Link to='deletemyitems'></Link>
                <Link to='editmylocation'></Link>
                <Link to='deletemylocation'></Link>
                <Link to='adminmanageaccount'></Link>
                <Link to='admineditaccount'></Link>
                <Link to='admindeleteaccount'></Link>
                <Link to='adminupdatetoadmin'></Link>
            </Router> */}
        </div>
    )}
};

export default Header
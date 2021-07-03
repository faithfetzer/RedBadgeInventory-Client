import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'


type HeaderProps = {
    sessionToken: string,
    productFeedView: boolean,
    myAccountView: boolean,
    adminAccountManager: boolean,
    userRole: string,
    adminStatus: boolean,
    myItemView: boolean,
    myLocationView: boolean,
    updateSessionToken: (newToken: string) => void,
    clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin:boolean) => void,
    notProductView: () => void,
    updateMyAccountView: () => void,
    updateAdminAccount: () => void,
    updateMyLocationView: () => void,
    updateMyItemView: () => void
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
            <button onClick={this.props.clearLocalStorage}>Log Out</button>
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
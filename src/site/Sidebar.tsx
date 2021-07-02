import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'


type SidebarProps = {
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
    updateProductView: () => void,
    updateMyAccountView: () => void,
    updateAdminAccount: () => void,
    updateMyLocationView: () => void,
    updateMyItemView: () => void
    }

type SidebarState = {

}

class Sidebar extends React.Component<SidebarProps, {}>{
    constructor(props: SidebarProps){
        super(props)
    }

    render(){
        return(
            <div>
                {/* {this.manageMyAccount()} */}
                <Router>
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
                </Router>
            </div>
        )}
}

export default Sidebar;


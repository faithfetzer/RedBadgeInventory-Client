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
    notProductView: () => void,
    updateMyAccountView: () => void,
    updateAdminAccount: () => void,
    updateMyLocationView: () => void,
    updateMyItemView: () => void,
    productView: () => void,
    notMyAccountView: () => void,
    notAdminAccount: () => void,
    notMyItemView: () => void,
    notMyLocationView: () => void
    }

type SidebarState = {

}

class Sidebar extends React.Component<SidebarProps, {}>{
    constructor(props: SidebarProps){
        super(props)
    }

    linkList(){
        <Router>
                <Link to='/managemyaccount'></Link>
                <Link to='/'></Link>
        </Router>
    }

    manageMyAccount(){
        return !this.props.myAccountView ? <><li><Link to='/managemyaccount' onClick={this.props.updateMyAccountView}>My Account</Link></li></> : <></>
    }
    makerLink(){

    }
    render(){
        return(
            <div className='sidebar'>
                <Router>
                <div className='sidebar-list-styling'>
                    <ul className='sidebar-list list-unstyled'>
                        {this.manageMyAccount()}
                        <li><Link to='/productfeed'>Product Feed</Link></li>
                        <li><Link to='/editmyaccount'></Link></li>
                        <li><Link to='/deletemyaccount'></Link></li>

                        <li><Link to='/addmyitems'></Link></li>
                        <li><Link to='/myitems'></Link></li>
                        <li><Link to='/editmyitems'></Link></li>
                        <li><Link to='/deletemyitems'></Link></li>

                        <li><Link to='/mylocations'></Link></li>
                        <li><Link to='/addmylocations'></Link></li>
                        <li><Link to='/editmylocation'></Link></li>
                        <li><Link to='/deletemylocation'></Link></li>

                        <li><Link to='/adminmanageaccount' onClick={this.props.updateAdminAccount}>Account Manager</Link></li>
                        <li><Link to='/admineditaccount'></Link></li>
                        <li><Link to='/admindeleteaccount'></Link></li>
                        <li><Link to='/adminupdatetoadmin'></Link></li>
                    </ul>
                </div>
                </Router>
            </div>
        )}
}

export default Sidebar;


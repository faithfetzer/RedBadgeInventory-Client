import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import ProductFeed from '../components/productFeed/ProductFeed'
import ViewAccount from '../components/manageAccount/ViewAccount'
import EditAccount from '../components/manageAccount/EditAccount'
import AddItem from '../components/makerLinks/items/AddItem'
import ViewItem from '../components/makerLinks/items/ViewItem'
import ViewLocation from '../components/makerLinks/locations/ViewLocations'
import AddLocation from '../components/makerLinks/locations/AddLocation'
import ViewUserInfo from '../components/adminLinks/ViewUserInfo'

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
    updateUserInfo: (role: string, admin: boolean) => void,
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
    constructor(props: SidebarProps) {
        super(props)
    }

    makerLinks() {
        return this.props.userRole == 'maker' ? <><li><Link to='/addmyitems'>Add Items</Link></li>
            <li><Link to='/myitems'>View My Inventory</Link></li>
            {/* <li><Link to='/editmyitems'></Link></li> */}
            {/* <li><Link to='/deletemyitems'></Link></li> */}

            <li><Link to='/mylocations'>View My Listing Locations</Link></li>
            <li><Link to='/addmylocations'>Add a Listing Location</Link></li>
            {/* <li><Link to='/editmylocation'></Link></li> */}
            {/* <li><Link to='/deletemylocation'></Link></li> */}</> : <></>
    }

    adminLinks() {
        return this.props.adminStatus ? <><li><Link to='/adminmanageaccount' onClick={this.props.updateAdminAccount}>Admin Account Manager</Link></li>
            {/* <li><Link to='/admineditaccount'></Link></li> */}
            {/* <li><Link to='/admindeleteaccount'></Link></li> */}
            {/* <li><Link to='/adminupdatetoadmin'></Link></li> */}</> : <></>
    }
    render() {
        return (
            <div className='sidebar'>
                <Router>
                    <div className='sidebar-list-styling'>
                        <ul className='sidebar-list list-unstyled'>
                            <li><Link to='/productfeed'>Product Feed</Link></li>
                            <li><Link to='/viewmyaccount' onClick={this.props.updateMyAccountView}>View My Account</Link></li>
                            <li><Link to='/editmyaccount'>Edit My Account</Link></li>
                            {/* <li><Link to='/deletemyaccount'></Link></li> */}

                            {this.makerLinks()}
                            {this.adminLinks()}
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path='/viewmyaccount'><ViewAccount sessionToken={this.props.sessionToken}/></Route>
                        <Route exact path='/editmyaccount'><EditAccount sessionToken={this.props.sessionToken}/></Route>
                        {/* <Route exact path='/deletemyaccount'></Route> */}

                        <Route exact path='/productfeed'><ProductFeed sessionToken={this.props.sessionToken} /></Route>

                        <Route exact path='/myitems'><ViewItem sessionToken={this.props.sessionToken}/></Route>
                        {/* <Route exact path='/editmyitems'></Route> */}
                        <Route exact path='/addmyitems'><AddItem sessionToken={this.props.sessionToken}/></Route>
                        {/* <Route exact path='/deletemyitems'></Route> */}

                        <Route exact path='/mylocations'><ViewLocation sessionToken={this.props.sessionToken}/></Route>
                        <Route exact path='/addmylocations'><AddLocation sessionToken={this.props.sessionToken}/></Route>
                        {/* <Route exact path='/editmylocation'></Route> */}
                        {/* <Route exact path='/deletemylocation'></Route> */}

                        <Route exact path='/adminmanageaccount'><ViewUserInfo sessionToken={this.props.sessionToken}/></Route>
                        {/* <Route exact path='/admineditaccount'></Route> */}
                        {/* <Route exact path='/admindeleteaccount'></Route> */}
                        {/* <Route exact path='/adminupdatetoadmin'></Route> */}
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Sidebar;


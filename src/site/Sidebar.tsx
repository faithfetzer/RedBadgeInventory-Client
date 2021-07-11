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
import DeleteAccount from '../components/manageAccount/DeleteAccount';
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles'


type SidebarProps = {
    sessionToken: string,
    userRole: string,
    adminStatus: boolean | null,
    currentUserId: number | undefined,
    updateSessionToken: (newToken: string) => void,
    clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin: boolean, userID: number) => void,
}

type SidebarState = {

}

class Sidebar extends React.Component<SidebarProps, {}>{
    constructor(props: SidebarProps) {
        super(props)
    }

    makerLinks() {
        return this.props.userRole == 'maker' ? <>
            <hr/>
            {/* <li><Link to='/addmyitems'>Add Items</Link></li> */}
            <li><Link to='/myitems'>View My Inventory</Link></li>
            {/* <li><Link to='/editmyitems'></Link></li> */}
            {/* <li><Link to='/deletemyitems'></Link></li> */}
            <hr/>
            <li><Link to='/mylocations'>View My Listing Locations</Link></li>
            {/* <li><Link to='/addmylocations'>Add a Listing Location</Link></li> */}
            {/* <li><Link to='/editmylocation'></Link></li> */}
            {/* <li><Link to='/deletemylocation'></Link></li> */}</> : <></>
    }

    adminLinks() {
        return this.props.adminStatus ? <>
            <hr/>
            <li><Link to='/adminmanageaccount' >Admin Account Manager</Link></li>
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
                            <hr/>
                            <li><Link to='/viewmyaccount'>View My Account</Link></li>
                            {/* <li><Link to='/editmyaccount'>Edit My Account</Link></li> */}
                            {/* <li><Link to='/deletemyaccount'></Link></li> */}

                            {this.makerLinks()}
                            {this.adminLinks()}
                        </ul>
                    </div>
                    <Switch>
                        <Route exact path='/viewmyaccount'><ViewAccount updateUserInfo={this.props.updateUserInfo} sessionToken={this.props.sessionToken} adminStatus={this.props.adminStatus} currentUserId={this.props.currentUserId}/></Route>
                        <Route exact path='/editmyaccount'><EditAccount updateUserInfo={this.props.updateUserInfo} sessionToken={this.props.sessionToken} adminStatus={this.props.adminStatus} currentUserId={this.props.currentUserId}/></Route>
                        <Route exact path='/deletemyaccount'><DeleteAccount clearLocalStorage={this.props.clearLocalStorage} sessionToken={this.props.sessionToken} adminStatus={this.props.adminStatus} currentUserId={this.props.currentUserId}/></Route>

                        <Route exact path='/productfeed'><ProductFeed sessionToken={this.props.sessionToken} /></Route>

                        <Route exact path='/myitems'><ViewItem sessionToken={this.props.sessionToken} currentUserId={this.props.currentUserId}/></Route>
                        {/* <Route exact path='/editmyitems/'><EditItem sessionToken={this.props.sessionToken}/></Route> */}
                        <Route exact path='/addmyitems'><AddItem sessionToken={this.props.sessionToken} currentUserId={this.props.currentUserId}/></Route>
                        {/* <Route exact path='/deletemyitems/'><DeleteItem sessionToken={this.props.sessionToken}/></Route> */}

                        <Route exact path='/mylocations'><ViewLocation sessionToken={this.props.sessionToken} currentUserId={this.props.currentUserId}/></Route>
                        <Route exact path='/addmylocations'><AddLocation sessionToken={this.props.sessionToken}currentUserId={this.props.currentUserId}/></Route>
                        {/* <Route exact path='/editmylocation/'><EditLocation sessionToken={this.props.sessionToken}/></Route> */}
                        {/* <Route exact path='/deletemylocation/'><DeleteLocation sessionToken={this.props.sessionToken}/></Route> */}

                        <Route exact path='/adminmanageaccount'><ViewUserInfo sessionToken={this.props.sessionToken} /></Route>
                        {/* <Route exact path='/admineditaccount'><EditUserInfo sessionToken={this.props.sessionToken}/></Route>
                        <Route exact path='/admindeleteaccount'><DeleteUser sessionToken={this.props.sessionToken}/></Route>
                        <Route exact path='/adminupdatetoadmin'><MakeUserAdmin sessionToken={this.props.sessionToken}/></Route> */}
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Sidebar;


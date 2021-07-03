import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import ProductFeed from '../components/productFeed/ProductFeed'

type DisplayProps = {
    sessionToken: string,
    adminStatus: boolean,
    productFeedView: boolean,
    myAccountView: boolean,
    adminAccountManager: boolean,
    myItemView: boolean,
    myLocationView: boolean,
    userRole: string,
    updateSessionToken: (newToken: string) => void,
    clearLocalStorage: () => void,
    updateUserInfo: (role: string, admin:boolean) => void,
    updateMyLocationView: () => void,
    updateMyItemView: () => void,
    updateMyAccountView: () => void,
    updateAdminAccount: () => void,
    notProductView: () => void,
    productView: () => void,
    notMyAccountView: () => void,
    notAdminAccount: () => void,
    notMyItemView: () => void,
    notMyLocationView: () => void
}

class Display extends React.Component<DisplayProps, {}>{
    constructor(props: DisplayProps){
        super(props)
    }

    render(){
    return(
        <div>
            <Router>
            <Switch>
                <Route exact path='/managemyaccount'></Route>
                <Route exact path='/editmyaccount'></Route>
                <Route exact path='/deletemyaccount'></Route>

                <Route exact path='/productfeed'><ProductFeed sessionToken={this.props.sessionToken}
                productFeedView={this.props.productFeedView}/></Route>
                
                <Route exact path='/myitems'></Route>
                <Route exact path='/editmyitems'></Route>
                <Route exact path='/addmyitems'></Route>
                <Route exact path='/deletemyitems'></Route>
                
                <Route exact path='/mylocations'></Route>
                <Route exact path='/addmylocations'></Route>
                <Route exact path='/editmylocation'></Route>
                <Route exact path='/deletemylocation'></Route>

                <Route exact path='/adminmanageaccount'></Route>
                <Route exact path='/admineditaccount'></Route>
                <Route exact path='/admindeleteaccount'></Route>
                <Route exact path='/adminupdatetoadmin'></Route>
            </Switch>
            </Router>
        </div>
    )}
};

export default Display
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
            <p>Display</p>
        </div>
    )}
};

export default Display
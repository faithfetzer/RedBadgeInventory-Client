import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import APIURL from '../../../helpers/environment'
import {ItemInfo} from '../../../Interfaces'

type ViewItemProps = {
    sessionToken: string,
    // adminStatus: boolean,
    // productFeedView: boolean,
    // myAccountView: boolean,
    // adminAccountManager: boolean,
    // myItemView: boolean,
    // myLocationView: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    // updateMyLocationView: () => void,
    // updateMyItemView: () => void,
    // updateMyAccountView: () => void,
    // updateAdminAccount: () => void,
    // notProductView: () => void,
    // productView: () => void,
    // notMyAccountView: () => void,
    // notAdminAccount: () => void,
    // notMyItemView: () => void,
    // notMyLocationView: () => void
}

type ViewItemState = {
    products: ItemInfo[]
}

class ViewItem extends React.Component<ViewItemProps, ViewItemState>{
    constructor(props: ViewItemProps){
        super(props)
    }

    render(){
    return(
        <div>
            <p>View Item</p>
        </div>
    )}
};

export default ViewItem
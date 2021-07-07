import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import {ItemInfo} from '../../../Interfaces'

type DeleteItemProps = {
    sessionToken: string,
    // id: number | undefined,
    // item: ItemInfo
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

class DeleteItem extends React.Component<DeleteItemProps, {}>{
    constructor(props: DeleteItemProps){
        super(props)
    }

    render(){
    return(
        <div>
            <p>Delete Item</p>
        </div>
    )}
};

export default DeleteItem
import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route,
    useLocation
    } from 'react-router-dom';
import React from 'react'
import {ItemInfo} from '../../../Interfaces'

type EditItemProps = {
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

type EditItemState = {
    id: number, 
    item: ItemInfo
}

// const stateImport: FunctionComponent = () =>{
//     const location = useLocation()
//     console.log('edit', location.id, location.items)
// }

class EditItem extends React.Component<EditItemProps, EditItemState>{
    constructor(props: EditItemProps){
        super(props)
    }

    logInfo(){
        console.log('edit')
    }
    // fetchMyItems() {
    //     let url = `${APIURL}/items/mine`
    //     fetch(url, {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-type': 'application/json',
    //             'Authorization': this.props.sessionToken
    //         })
    //     })
    //         .then(response => response.json())
    //         .then((response) => {
    //             console.log('response', response);
    //             this.setState({
    //                 myProducts: response.myItems
    //             }, () => console.log(this.state.myProducts))
    //         })
    //         .catch(err => console.log(err))
    // }

    componentDidMount(){
        this.logInfo()
    }
    render(){
    return(
        <div>
            <p>Edit Item</p>
        </div>
    )}
};

export default EditItem
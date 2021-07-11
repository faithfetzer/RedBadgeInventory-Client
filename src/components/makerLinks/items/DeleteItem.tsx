import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route,
    useParams
    } from 'react-router-dom';
import React from 'react'
import {ItemInfo} from '../../../Interfaces'
import APIURL from '../../../helpers/environment'
import {Button} from '@material-ui/core'
import {Delete, Clear} from '@material-ui/icons'

// DELETE /items/delete/:id

type DeleteItemProps = {
    sessionToken: string,
    itemToChange: number | null
    // id: number | undefined,
    // item: ItemInfo
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
    fetchItems: () => void,
    changeDeleteView: () => void,
    setItemToChange: (id: number | null) => void
}

type DeleteItemState = {
    item: ItemInfo
}

class DeleteItem extends React.Component<DeleteItemProps, DeleteItemState>{
    constructor(props: DeleteItemProps){
        super(props)
        this.state= {
            item: {
                id: 0,
                name : "",
                description : "",
                volume: undefined,
                volumeUnit: "",
                weight: undefined,
                weightUnit: "",
                height: undefined,
                width: undefined,
                depth: undefined,
                lengthUnit : "",
                category: "",
                available : false,
                price :  undefined,
                totalQuantity : 0,
                quantityListed : undefined,
                quantitySold: 0,
                userId: undefined,
                locationId: null,
                user: {id: undefined,
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    admin: null,
                    role: ""}
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){

    }

    render(){
    return(
        <div>
            <p>Delete Item</p>
        </div>
    )}
};

export default DeleteItem
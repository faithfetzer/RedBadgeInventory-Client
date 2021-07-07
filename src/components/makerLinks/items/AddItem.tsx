import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import {ItemInfo} from '../../../Interfaces'
import { unwatchFile } from 'fs';

type AddItemProps = {
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

type AddItemState = {
    item: ItemInfo
}

class AddItem extends React.Component<AddItemProps, AddItemState>{
    constructor(props: AddItemProps){
        super(props)
        this.state= {
            item: {
                id: undefined,
                maker_id : undefined,
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
                location_id : undefined,
                quantityListed : undefined,
                quantitySold: 0
            }
        }
    }

    handleChange(){

    }

    handleSubmit(){

    }

    render(){
    return(
        <div>
            <p>Add Item</p>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Item Name</label>
                <br/>
                <input type="string" id='name' name='name' value={this.state.item.name} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='description'>Description</label>
                <br/>
                <input type="string" id='description' name='description' value={this.state.item.description} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='volume'>Volume</label>
                <br/>
                <input type="number" id='volume' name='volume' value={this.state.item.volume} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='volumeUnit'>Volume Unit</label>
                <br/>
                <input type="string" id='volumeUnit' name='volumeUnit' value={this.state.item.volumeUnit} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='height'>Height</label>
                <br/>
                <input type="number" id='height' name='height' value={this.state.item.height} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='width'>Width</label>
                <br/>
                <input type="number" id='width' name='width' value={this.state.item.width} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='depth'>Depth</label>
                <br/>
                <input type="number" id='depth' name='depth' value={this.state.item.depth} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='lengthUnit'>Length Unit</label>
                <br/>
                <input type="string" id='lengthUnit' name='lengthUnit' value={this.state.item.lengthUnit} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='category'>Category</label>
                <br/>
                <input type="string" id='category' name='category' value={this.state.item.category} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='available'>Available</label>
                <br/>
                <input type="checkbox" id='available' name='available' checked={this.state.item.available} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='price'>Price</label>
                <br/>
                <input type="number" id='price' name='price' value={this.state.item.price} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='totalQuantity'>Total Quantity</label>
                <br/>
                <input type="number" id='totalQuantity' name='totalQuantity' value={this.state.item.totalQuantity} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='location'>Location</label>
                <br/>
                <input type="number" id='location' name='location' value={this.state.item.location_id} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='quantityListed'>Quantity Listed</label>
                <br/>
                <input type="number" id='quantityListed' name='quantityListed' value={this.state.item.quantityListed} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='quantitySold'>Quantity Sold</label>
                <br/>
                <input type="number" id='quantitySold' name='quantitySold' value={this.state.item.quantitySold} onChange={this.handleChange}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )}
};

export default AddItem
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
import {Clear} from '@material-ui/icons'

// PUT /items/update/:id const {name, description,volume,volumeUnit,weight,weightUnit,height,width,depth,lengthUnit,category,available,price,totalQuantity,location,quantityListed,quantitySold} = req.body

type EditItemProps = {
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
    changeEditView: () => void,
    setItemToChange: (id: number | null) => void
}

type EditItemState = {
    item: ItemInfo,
    newItem: ItemInfo
}


class EditItem extends React.Component<EditItemProps, EditItemState>{
    constructor(props: EditItemProps){
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
            },
            newItem: {
                id: this.state.item.id,
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
        this.handleChange = this.handleChange.bind(this)
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
    
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>){
        this.setState({
            ...this.state,
            newItem: {
            [e.target.name] : e.target.value}} as any)

    }

    handleSubmit(){

    }

    render(){
    return(
        <div>
            <p>Edit Item</p>
            <form onSubmit={() => {this.handleSubmit(); this.props.setItemToChange(null); this.props.changeEditView(); this.props.fetchItems()}}>
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
                {/* <input type="number" id='location' name='location' value={this.state.item.locationId} onChange={this.handleChange}></input> */}
                <br/>
                <label htmlFor='quantityListed'>Quantity Listed</label>
                <br/>
                <input type="number" id='quantityListed' name='quantityListed' value={this.state.item.quantityListed} onChange={this.handleChange}></input>
                <br/>
                <label htmlFor='quantitySold'>Quantity Sold</label>
                <br/>
                <input type="number" id='quantitySold' name='quantitySold' value={this.state.item.quantitySold} onChange={this.handleChange}></input>
                <br/>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
        </div>
    )}
};

export default EditItem
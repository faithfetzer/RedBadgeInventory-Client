import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import APIURL from '../../../helpers/environment'
import { ItemInfo } from '../../../Interfaces'
import EditItem from '../items/EditItem'
import DeleteItem from '../items/DeleteItem'
import {Button} from '@material-ui/core'
import {Delete, Clear} from '@material-ui/icons'

type ViewItemProps = {
    sessionToken: string,
    currentUserId: number | undefined,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type ViewItemState = {
    myProducts: ItemInfo[],
    editItemView: boolean,
    deleteItemView: boolean,
    itemToChange: number | null
}

class ViewItem extends React.Component<ViewItemProps, ViewItemState>{
    constructor(props: ViewItemProps) {
        super(props)
        this.state = {
            myProducts: [],
            editItemView: false,
            deleteItemView: false,
            itemToChange: null
        }
        this.setItemToChange = this.setItemToChange.bind(this)
        this.changeDeleteView = this.changeDeleteView.bind(this)
        this.changeEditView =this.changeEditView.bind(this)
    }

    fetchMyItems() {
        let url = `${APIURL}/items/mine`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                this.setState({
                    myProducts: response.myItems
                }, () => console.log(this.state.myProducts))
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchMyItems()
    }

    mapProducts() {
        if (this.state.myProducts.length > 0) {
            return this.state.myProducts.map((items, index) => {
                let quantityAvailable = items.totalQuantity - items.quantitySold
                return (
                    <>
                        <tr key={index}>
                            <td>{items.name}</td>
                            <td>{items.description}</td>
                            <td>{items.volume}{items.volumeUnit}</td>
                            <td>{items.weight}{items.weightUnit}</td>
                            <td>{items.height}</td>
                            <td>{items.width}</td>
                            <td>{items.depth}</td>
                            <td>{items.lengthUnit}</td>
                            <td>{items.category}</td>
                            <td>${items.price}</td>
                            <td>{quantityAvailable}</td>
                            <td><Button variant="contained" onClick={() => {this.changeEditView(); this.setItemToChange(items.id)}}>Edit</Button></td>
                            <td><Button variant="contained" color="secondary" onClick={this.changeDeleteView}><Delete/></Button></td>
                        </tr>
                        
                    </>
                )
            })
        } else {
            return <><tr><td colSpan={12}>No Items Currently In Inventory. <Link to='/addmyitems'>Add Something!</Link></td></tr></>
        }
    }

    setItemToChange(id: number | null){
        this.setState({
            itemToChange: id
        })
    }

    changeEditView = () =>{
        this.setState({
            editItemView: !this.state.editItemView
        })
    }

    changeDeleteView =() => {
        this.setState({
            deleteItemView: !this.state.deleteItemView
        })
    }

    editItemView(){
        return(
            <div>
                <Button variant="contained" onClick={this.changeEditView}><Clear/></Button>
                <EditItem sessionToken={this.props.sessionToken} changeEditView={this.changeEditView} setItemToChange={this.setItemToChange} itemToChange={this.state.itemToChange} fetchItems={this.fetchMyItems}/>
            </div>
        )
    }

    deleteItemView(){
        return(
            <div>
                <Button variant="contained" onClick={this.changeDeleteView}><Clear/></Button>
                <DeleteItem sessionToken={this.props.sessionToken} changeDeleteView={this.changeDeleteView} setItemToChange={this.setItemToChange} itemToChange={this.state.itemToChange} fetchItems={this.fetchMyItems}/>
            </div>
        )
    }

    viewController(){
        if(this.state.editItemView){
            return <>{this.editItemView()}</>
        } else if(this.state.deleteItemView){
            return <>{this.deleteItemView()}</>
        } else {
            return (
                <>
                    <Button variant="contained"><Link to='/addmyitems'>Add Items</Link></Button>
                    <table>
                        <thead>
                            <h2>My Inventory</h2>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Description</th>
                                <th>Volume</th>
                                <th>Weight</th>
                                <th>Height</th>
                                <th>Width</th>
                                <th>Depth</th>
                                <th>Units</th>
                                <th>Category</th>
                                <th>Price(each)</th>
                                <th>Quantity Available</th>
                                <th>Maker Contact</th>
                            </tr>
                        </thead>
                        <tbody>{this.mapProducts()}</tbody>
                    </table>
                </>
    
            )
        }
    }


    render() {
        return (
            <div>
                {this.viewController()}
            </div>

        )
    }
};

export default ViewItem
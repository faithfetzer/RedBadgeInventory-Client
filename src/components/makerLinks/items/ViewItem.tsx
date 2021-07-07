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
    myProducts: ItemInfo[]
}

class ViewItem extends React.Component<ViewItemProps, ViewItemState>{
    constructor(props: ViewItemProps) {
        super(props)
        this.state = {
            myProducts: []
        }
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
                            <td>{items.maker_id}</td>
                            <td><button><Link to={{pathname:'/editmyitems', state:{id: items.id}}}>Edit</Link></button></td>
                            <td><button><Link to={{pathname:'/deletemyitems'}}>Delete</Link></button></td>
                        </tr>
                    </>
                )
            })
        } else {
            return <><tr><td colSpan={12}>No Items Currently In Inventory. <Link to='/addmyitems'>Add Something!</Link></td></tr></>
        }
    }

    render() {
        return (
            <div>
                <button><Link to='/addmyitems'>Add Items</Link></button>
                <table>
                    <thead>
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

            </div>
        )
    }
};

export default ViewItem
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import APIURL from '../../helpers/environment'
import { ItemInfo } from '../../Interfaces'


type ProductProps = {
    sessionToken: string,
}

type ProductState = {
    products: ItemInfo[]
}
class ProductFeed extends React.Component<ProductProps, ProductState>{
    constructor(props: ProductProps) {
        super(props);
        this.state = {
            products: []
        }
    }

    fetchProducts() {
        let url = `${APIURL}/items/available`
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
                    products: response.availableItems
                }, () => console.log(this.state.products))
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchProducts()
    }

    mapProducts() {
        if (this.state.products.length > 0) {
            return this.state.products.map((items, index) => {
                let quantityAvailable = items.totalQuantity - items.quantitySold
                if (quantityAvailable > 0){
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
                        </tr>
                    </>
                )
                }
            })
        } else {
            return <><tr><td colSpan={12}>No Items Available</td></tr></>
        }
    }

    render() {
        return (
            <div>
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
                            <th>Unit</th>
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

export default ProductFeed
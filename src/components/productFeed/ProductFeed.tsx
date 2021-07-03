import {
    BrowserRouter as Router,
    Switch,
    Link, 
    Route
    } from 'react-router-dom';
import React from 'react'
import APIURL from '../../helpers/environment'
import {ItemInfo} from '../../Interfaces'


type ProductProps = {
    sessionToken: string,
    productFeedView: boolean,
}

type ProductState = {
    products: ItemInfo[]
}
class ProductFeed extends React.Component<ProductProps, ProductState>{
    constructor(props: ProductProps){
        super(props);
    this.state = {
        products: []
    }
    }
    
    fetchProducts(){
        let url = `${APIURL}/items/available`
        fetch(url,{
            method: 'GET',
            headers: new Headers({
                'Content-type' : 'application/json',
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
    }

    componentDidMount(){
        this.fetchProducts()
    }

    mapProducts(){
        if(this.state.products){
            return this.state.products.map((items, index) => {
                let quantityAvailable = items.totalQuantity - items.quantitySold
                return(
                    <>
                    <tr key={index}>
                        <td>{items.name}</td>
                        <td>{items.description}</td>
                        <td>{items.volume}</td>
                        <td>{items.volumeUnit}</td>
                        <td>{items.weight}</td>
                        <td>{items.weightUnit}</td>
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
            })
        } else {
            return <>No Items Available</>
        }
    }

    render(){
        return(
            <div>
                <table>
                <tr>
                        <th>Item Name</th>
                        <th>Item Description</th>
                        <th>Volume</th>
                        <th>Volume Units</th>
                        <th>Weight</th>
                        <th>Weight Unit</th>
                        <th>Height</th>
                        <th>Width</th>
                        <th>Depth</th>
                        <th>Units</th>
                        <th>Category</th>
                        <th>Price(each)</th>
                        <th>Quantity Available</th>
                        <th>Maker Contact</th>
                    </tr>
                {this.mapProducts()}
                </table>
            </div>
    )}
};

export default ProductFeed
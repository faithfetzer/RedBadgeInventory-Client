import React from 'react'
import APIURL from '../../helpers/environment'
import { ItemInfo } from '../../Interfaces'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import { Email } from '@material-ui/icons'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'


interface ProductProps extends WithStyles<typeof styles> {
    sessionToken: string,
}

type ProductState = {
    products: ItemInfo[]
}
const styles = () => createStyles({
    table: {
        // fontSize: 50,
        // textAlign: 'center',
        border: '3px solid #0A2463',
    },
    tableHead:{
        color: '#30011E',
        // backgroundColor: '#FFB7FF',
        border: 'none'
    }
})

const StyledTableRow = withStyles(() =>
    createStyles({
        root: {
            //   '&:nth-of-type(odd)': {
            // display: 'flex',
            // backgroundColor: "red",
            padding: '30px', 
            margin: '3px',
            height: 10,
            textAlign: 'center',
            // maxWidth: 500
            //   },
        },
    }),
)(TableRow);

const StyledTable = withStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#CCD7C5',
            height: 10,
            // width:'75px',
            textAlign: 'center',
        },
    }),
)(Table);

const StyledTableCell = withStyles(() =>
    createStyles({
        root: {
            //   '&:nth-of-type(odd)': {
            // backgroundColor: "blue",
            textAlign: 'center',
            padding: '2px', 
            margin: 0,
            // height: 10,
            fontSize: 14,
            border: '2px solid #0A2463'
            // maxWidth: 500
            //   },
        },
    }),
)(TableCell);

class ProductFeed extends React.Component<ProductProps, ProductState>{
    constructor(props: ProductProps) {
        super(props);
        this.state = {
            products: []
        }
        this.fetchProducts = this.fetchProducts.bind(this)
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
                    // ...this.state,
                    products: response.availableItems
                }, () => console.log(this.state.products))
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchProducts()
    }

    mapProducts() {
        // console.log('map')
        if (this.state.products) {
            // let productMap = JSON.stringify(this.state.products)
            // console.log(productMap)
            return this.state.products.map((items, index) => {
                let quantityAvailable = items.totalQuantity - items.quantitySold
                if (quantityAvailable > 0) {
                    console.log('mapinfo', [items])
                    return (
                        <>
                            <TableRow key={index}>
                                <StyledTableCell>{items.name}</StyledTableCell>
                                <StyledTableCell>{items.description}</StyledTableCell>
                                <StyledTableCell>{items.volume}{items.volumeUnit}</StyledTableCell>
                                <StyledTableCell>{items.weight}{items.weightUnit}</StyledTableCell>
                                <StyledTableCell>{items.height}</StyledTableCell>
                                <StyledTableCell>{items.width}</StyledTableCell>
                                <StyledTableCell>{items.depth}</StyledTableCell>
                                <StyledTableCell>{items.lengthUnit}</StyledTableCell>
                                <StyledTableCell>{items.category}</StyledTableCell>
                                <StyledTableCell>${items.price}</StyledTableCell>
                                <StyledTableCell>{quantityAvailable}</StyledTableCell>
                                {/* <td>{items.user.email}</td> */}
                                <StyledTableCell><a href="mailto: {items.user.email}"><Email />{items.user.email}</a></StyledTableCell>

                            </TableRow>
                        </>
                    )
                }
            })
        } else {
            return <><TableRow><StyledTableCell colSpan={12}>No Items Available</StyledTableCell></TableRow></>
        }
    }



    render() {
        const { classes } = this.props
        return (
            <div>
                <h2>Products Available</h2>
                <StyledTable className={classes.table}>
                    <TableHead>
                        <StyledTableRow className={classes.tableHead}>
                            <StyledTableCell>Item Name</StyledTableCell>
                            <StyledTableCell>Item Description</StyledTableCell>
                            <StyledTableCell>Volume</StyledTableCell>
                            <StyledTableCell>Weight</StyledTableCell>
                            <StyledTableCell>Height</StyledTableCell>
                            <StyledTableCell>Width</StyledTableCell>
                            <StyledTableCell>Depth</StyledTableCell>
                            <StyledTableCell>Unit</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Price<br/>(each)</StyledTableCell>
                            <StyledTableCell>Quantity Available</StyledTableCell>
                            <StyledTableCell>Maker Contact</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>{this.mapProducts()}</TableBody>
                </StyledTable>
            </div>
        )
    }
};

export default withStyles(styles)(ProductFeed)
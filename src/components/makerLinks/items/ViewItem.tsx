import {
    Link,
} from 'react-router-dom';
import React from 'react'
import APIURL from '../../../helpers/environment'
import { ItemInfo } from '../../../Interfaces'
import EditItem from '../items/EditItem'
import DeleteItem from '../items/DeleteItem'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Delete, Clear } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


interface ViewItemProps extends WithStyles<typeof styles> {
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

const styles = () => createStyles({
    mainDiv: {
        '& Button' :{
            margin: '5px'
        },
        '& h2' :{
            color: '#30011E'
        }
    },
    table: {
        border: '3px solid #0A2463',
    },
    tableHead:{
        color: '#30011E',
        backgroundColor: '#FFB7FF',
        border: 'none'
    }
})

const StyledTableRow = withStyles(() =>
    createStyles({
        root: {
            height: 10,
            textAlign: 'center',
        },
    }),
)(TableRow);

const StyledTable = withStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#CCD7C5',
            height: 10,
            width:'75px',
            textAlign: 'center',
        },
    }),
)(Table);

const StyledTableCell = withStyles(() =>
    createStyles({
        root: {
            textAlign: 'center',
            padding: '0', 
            margin: 0,
            fontSize: 14,
            // border: '2px solid #0A2463'
        },
    }),
)(TableCell);

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
        this.changeEditView = this.changeEditView.bind(this)
    }

    fetchMyItems() {
        let url = `${APIURL}/items/mine`
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
                // 'Authorization': localStorage.getItem('token')
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
        if (this.state.myProducts) {
            return this.state.myProducts.map((items, index) => {
                let quantityAvailable = items.totalQuantity - items.quantitySold
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
                            <StyledTableCell>{items.quantityListed}</StyledTableCell>
                            <StyledTableCell>{items.quantitySold}</StyledTableCell>
                            <StyledTableCell><Button variant="contained" onClick={() => { this.changeEditView(); this.setItemToChange(items.id) }}>Edit</Button></StyledTableCell>
                            <StyledTableCell><Button variant="contained" color="secondary" onClick={() => { this.changeDeleteView(); this.setItemToChange(items.id) }}><Delete /></Button></StyledTableCell>
                        </TableRow>

                    </>
                )
            })
        } else {
            return <><TableRow><StyledTableCell colSpan={15}>No Items Currently In Inventory. <Link to='/addmyitems' style={{ textDecoration: 'none' }}>Add Something!</Link></StyledTableCell></TableRow></>
        }
    }

    setItemToChange(id: number | null) {
        this.setState({
            itemToChange: id
        })
    }

    changeEditView = () => {
        this.setState({
            editItemView: !this.state.editItemView
        })
    }

    changeDeleteView = () => {
        this.setState({
            deleteItemView: !this.state.deleteItemView
        })
    }

    editItemView() {
        return (
            <div>
                <Button variant="contained" onClick={this.changeEditView}><Clear /></Button>
                <EditItem sessionToken={this.props.sessionToken} changeEditView={this.changeEditView} setItemToChange={this.setItemToChange} itemToChange={this.state.itemToChange} fetchItems={this.fetchMyItems} />
            </div>
        )
    }

    deleteItemView() {
        return (
            <div>
                <Button variant="contained" onClick={this.changeDeleteView}><Clear /></Button>
                <DeleteItem sessionToken={this.props.sessionToken} changeDeleteView={this.changeDeleteView} setItemToChange={this.setItemToChange} itemToChange={this.state.itemToChange} fetchItems={this.fetchMyItems} />
            </div>
        )
    }

    viewController() {
        if (this.state.editItemView) {
            return <>{this.editItemView()}</>
        } else if (this.state.deleteItemView) {
            return <>{this.deleteItemView()}</>
        } else {
            return (
                <>            
                <h2>My Inventory</h2>
                    <Button variant="contained"><Link to='/addmyitems' style={{ textDecoration: 'none' }}>Add Items</Link></Button>
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Volume</StyledTableCell>
                                <StyledTableCell>Weight</StyledTableCell>
                                <StyledTableCell>Height</StyledTableCell>
                                <StyledTableCell>Width</StyledTableCell>
                                <StyledTableCell>Depth</StyledTableCell>
                                <StyledTableCell>Unit</StyledTableCell>
                                <StyledTableCell>Category</StyledTableCell>
                                <StyledTableCell>Price(each)</StyledTableCell>
                                <StyledTableCell># Available</StyledTableCell>
                                <StyledTableCell># Listed</StyledTableCell>
                                <StyledTableCell># Sold</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>{this.mapProducts()}</TableBody>
                    </StyledTable>
                </>

            )
        }
    }


    render() {
        const { classes } = this.props

        return (
            <div className={classes.mainDiv}>
                {this.viewController()}
            </div>

        )
    }
};

export default withStyles(styles)(ViewItem)
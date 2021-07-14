
import React from 'react'
import { ItemInfo } from '../../../Interfaces'
import APIURL from '../../../helpers/environment'
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


// POST /items/add const {         name,          description,         volume,         volumeUnit,         weight,         weightUnit,         height,         width,         depth,         lengthUnit,         category,         available,         price,         totalQuantity,         location,         quantityListed,         quantitySold     } = req.body

interface AddItemProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type AddItemState = {
    item: ItemInfo
}

const styles = () => createStyles({
    mainDiv: {
        fontSize: 12,
        '& label':{
            fontWeight: 'bold'
        }
    }
})

class AddItem extends React.Component<AddItemProps, AddItemState>{
    constructor(props: AddItemProps) {
        super(props)
        this.state = {
            item: {
                id: 0,
                name: "",
                description: "",
                volume: undefined,
                volumeUnit: "",
                weight: undefined,
                weightUnit: "",
                height: undefined,
                width: undefined,
                depth: undefined,
                lengthUnit: "",
                category: "",
                available: false,
                price: undefined,
                location: "",
                totalQuantity: 0,
                quantityListed: undefined,
                quantitySold: 0,
                userId: this.props.currentUserId,
                locationId: null,
                user: {
                    id: undefined,
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    admin: null,
                    role: ""
                }
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [e.target.name]: e.target.value
            }
        } as any, () => console.log(this.state.item))

    }

    handleSubmit(e: any) {
        e.preventDefault()
        let url = `${APIURL}/items/add`
        let reqBody =
        {
            name: this.state.item.name,
            description: this.state.item.description,
            volume: this.state.item.volume,
            volumeUnit: this.state.item.volumeUnit,
            weight: this.state.item.weight,
            weightUnit: this.state.item.weightUnit,
            height: this.state.item.height,
            width: this.state.item.width,
            depth: this.state.item.depth,
            lengthUnit: this.state.item.lengthUnit,
            category: this.state.item.category,
            available: this.state.item.available,
            price: this.state.item.price,
            totalQuantity: this.state.item.totalQuantity,
            location: this.state.item.location,
            quantityListed: this.state.item.quantityListed,
            quantitySold: this.state.item.quantitySold
        }

        console.log('submit', reqBody)

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then(response => response.json())
            .then((response) => {
                console.log('response', response);
                this.setState({
                        item: {
                            id: 0,
                            name: "",
                            description: "",
                            volume: undefined,
                            volumeUnit: "",
                            weight: undefined,
                            weightUnit: "",
                            height: undefined,
                            width: undefined,
                            depth: undefined,
                            lengthUnit: "",
                            category: "",
                            available: false,
                            price: undefined,
                            location: "",
                            totalQuantity: 0,
                            quantityListed: undefined,
                            quantitySold: 0,
                            userId: this.props.currentUserId,
                            locationId: null,
                            user: {
                                id: undefined,
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                                admin: null,
                                role: ""
                            }
                    }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.mainDiv}>
                <h2>Add Item</h2>
                <form>
                    <label htmlFor='name'>Item Name</label>
                    <br />
                    <input type="string" id='name' name='name' value={this.state.item.name} onChange={this.handleChange} required></input>
                    <br />
                    <label htmlFor='description'>Description</label>
                    <br />
                    <input type="string" id='description' name='description' value={this.state.item.description} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='volume'>Volume</label>
                    <br />
                    <input type="number" id='volume' name='volume' value={this.state.item.volume} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='volumeUnit'>Volume Unit</label>
                    <br />
                    <input type="string" id='volumeUnit' name='volumeUnit' value={this.state.item.volumeUnit} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='height'>Height</label>
                    <br />
                    <input type="number" id='height' name='height' value={this.state.item.height} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='width'>Width</label>
                    <br />
                    <input type="number" id='width' name='width' value={this.state.item.width} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='depth'>Depth</label>
                    <br />
                    <input type="number" id='depth' name='depth' value={this.state.item.depth} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='lengthUnit'>Length Unit</label>
                    <br />
                    <input type="string" id='lengthUnit' name='lengthUnit' value={this.state.item.lengthUnit} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='category'>Category</label>
                    <br />
                    <input type="string" id='category' name='category' value={this.state.item.category} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='available'>Available</label>
                    <br />
                    <input type="checkbox" id='available' name='available' checked={this.state.item.available} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='price'>Price</label>
                    <br />
                    <input type="number" id='price' name='price' value={this.state.item.price} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='totalQuantity'>Total Quantity</label>
                    <br />
                    <input type="number" id='totalQuantity' name='totalQuantity' value={this.state.item.totalQuantity} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='location'>Location</label>
                    <br />
                    <input type="text" id='location' name='location' value={this.state.item.location} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='quantityListed'>Quantity Listed</label>
                    <br />
                    <input type="number" id='quantityListed' name='quantityListed' value={this.state.item.quantityListed} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='quantitySold'>Quantity Sold</label>
                    <br />
                    <input type="number" id='quantitySold' name='quantitySold' value={this.state.item.quantitySold} onChange={this.handleChange}></input>
                    <br />
                    <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(AddItem)
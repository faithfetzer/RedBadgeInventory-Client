import React from 'react'
import { ItemInfo } from '../../../Interfaces'
import APIURL from '../../../helpers/environment'
import { Button } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


// PUT /items/update/:id const {name, description,volume,volumeUnit,weight,weightUnit,height,width,depth,lengthUnit,category,available,price,totalQuantity,location,quantityListed,quantitySold} = req.body

interface EditItemProps extends WithStyles<typeof styles> {
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

const styles = () => createStyles({
})

class EditItem extends React.Component<EditItemProps, EditItemState>{
    constructor(props: EditItemProps) {
        super(props)
        this.state = {
            item: {
                id: this.props.itemToChange,
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
                location: '',
                totalQuantity: 0,
                quantityListed: undefined,
                quantitySold: 0,
                userId: undefined,
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
            },
            newItem: {
                id: this.props.itemToChange,
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
                totalQuantity: 0,
                location: '',
                quantityListed: undefined,
                quantitySold: 0,
                userId: undefined,
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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    fetchThisItem() {
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
                if (this.props.itemToChange) {
                    for (let i = 0; i < response.myItems.length; i++) {
                        if (response.myItems[i].id === this.props.itemToChange) {
                            console.log('yes', response.myItems[i])
                            this.setState({
                                item: response.myItems[i],
                                newItem: response.myItems[i]
                            }, () => console.log(this.state.item))
                        }
                        else {
                            console.log('no', response.myItems)
                        }
                    }
                }
                else { console.log('noitems', response.myItems) }
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchThisItem()
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        } as any)

    }

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('submit', this.state.newItem)
        let reqBody = {
            name: this.state.newItem.name,
            description: this.state.newItem.description,
            volume: this.state.newItem.volume,
            volumeUnit: this.state.newItem.volumeUnit,
            weight: this.state.newItem.weight,
            weightUnit: this.state.newItem.weightUnit,
            height: this.state.newItem.height,
            width: this.state.newItem.width,
            depth: this.state.newItem.depth,
            lengthUnit: this.state.newItem.lengthUnit,
            category: this.state.newItem.category,
            available: this.state.newItem.available,
            price: this.state.newItem.price,
            totalQuantity: this.state.newItem.totalQuantity,
            location: this.state.newItem.location,
            quantityListed: this.state.newItem.quantityListed,
            quantitySold: this.state.newItem.quantitySold
        }
        let url = `${APIURL}/items/update/${this.props.itemToChange}`
        console.log(reqBody, url, this.props.sessionToken)

        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.setItemToChange(null)
                this.props.changeEditView()
                this.props.fetchItems()
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <h2>Edit Item</h2>
                <form >
                    <label htmlFor='name'>Item Name</label>
                    <br />
                    <input type="string" id='name' name='name' value={this.state.newItem.name} onChange={this.handleChange} ></input>
                    <br />
                    <label htmlFor='description'>Description</label>
                    <br />
                    <input type="string" id='description' name='description' value={this.state.newItem.description} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='volume'>Volume</label>
                    <br />
                    <input type="number" id='volume' name='volume' value={this.state.newItem.volume} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='volumeUnit'>Volume Unit</label>
                    <br />
                    <input type="string" id='volumeUnit' name='volumeUnit' value={this.state.newItem.volumeUnit} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='height'>Height</label>
                    <br />
                    <input type="number" id='height' name='height' value={this.state.newItem.height} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='width'>Width</label>
                    <br />
                    <input type="number" id='width' name='width' value={this.state.newItem.width} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='depth'>Depth</label>
                    <br />
                    <input type="number" id='depth' name='depth' value={this.state.newItem.depth} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='lengthUnit'>Length Unit</label>
                    <br />
                    <input type="string" id='lengthUnit' name='lengthUnit' value={this.state.newItem.lengthUnit} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='category'>Category</label>
                    <br />
                    <input type="string" id='category' name='category' value={this.state.newItem.category} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='available'>Available</label>
                    <br />
                    <input type="checkbox" id='available' name='available' checked={this.state.newItem.available} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='price'>Price</label>
                    <br />
                    <input type="number" id='price' name='price' value={this.state.newItem.price} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='totalQuantity'>Total Quantity</label>
                    <br />
                    <input type="number" id='totalQuantity' name='totalQuantity' value={this.state.newItem.totalQuantity} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='location'>Location</label>
                <br/>
                    <input type="number" id='location' name='location' value={this.state.item.location} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='quantityListed'>Quantity Listed</label>
                    <br />
                    <input type="number" id='quantityListed' name='quantityListed' value={this.state.newItem.quantityListed} onChange={this.handleChange}></input>
                    <br />
                    <label htmlFor='quantitySold'>Quantity Sold</label>
                    <br />
                    <input type="number" id='quantitySold' name='quantitySold' value={this.state.newItem.quantitySold} onChange={this.handleChange}></input>
                    <br />
                    <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>
                </form>
            </div>
        )
    }
};

export default withStyles(styles)(EditItem)
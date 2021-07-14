import React from 'react'
import { ItemInfo } from '../../../Interfaces'
import APIURL from '../../../helpers/environment'
import { Button } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'


// DELETE /items/delete/:id

interface DeleteItemProps extends WithStyles<typeof styles> {
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
    changeDeleteView: () => void,
    setItemToChange: (id: number | null) => void
}

type DeleteItemState = {
    item: ItemInfo
}

const styles = () => createStyles({
})

class DeleteItem extends React.Component<DeleteItemProps, DeleteItemState>{
    constructor(props: DeleteItemProps) {
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
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit(e: any) {
        e.preventDefault()
        console.log('delete', this.state.item)
        let url = `${APIURL}/items/delete/${this.props.itemToChange}`

        console.log(url, this.props.sessionToken)
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.setItemToChange(null)
                // this.props.fetchItems()
                this.props.changeDeleteView()
                // this.success()
                console.log(response)
            })
            .catch(err => {
                console.log(err)
                // this.failure(err)
            })
    }

    render() {
        const { classes } = this.props

        return (
            <div>
                <h2>Delete Item</h2>
                <p>Name: {this.state.item.name}</p>
                <p>Description: {this.state.item.description}</p>
                <p>Volume: {this.state.item.volume}{this.state.item.volumeUnit}</p>
                <p>Weight: {this.state.item.weight}{this.state.item.weightUnit}</p>
                <p>Height: {this.state.item.height}</p>
                <p>Width: {this.state.item.width}</p>
                <p>Depth: {this.state.item.depth}</p>
                <p>Unit: {this.state.item.lengthUnit}</p>
                <p>Category: {this.state.item.category}</p>
                <p>Price(each): ${this.state.item.price}</p>
                <p>Total Quantity: {this.state.item.totalQuantity}</p>
                <p>Quantity Listed: {this.state.item.quantityListed}</p>
                <p>Quantity Sold: {this.state.item.quantitySold}</p>
                <Button variant="contained" onClick={this.handleSubmit}><Delete/>Delete</Button>
            </div>
        )
    }
};

export default withStyles(styles)(DeleteItem)
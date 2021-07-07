import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'

type ViewLocationProps = {
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

type ViewLcationState = {
    myLocations: LocationInfo[]
}

class ViewLocation extends React.Component<ViewLocationProps, ViewLcationState>{
    constructor(props: ViewLocationProps) {
        super(props)
        this.state = {
            myLocations: []
        }
    }

    fetchMyItems() {
        let url = `${APIURL}/locations/`
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
                    myLocations: response.myLocations
                }, () => console.log(this.state.myLocations))
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchMyItems()
    }

    mapProducts() {
        if (this.state.myLocations.length > 0) {
            return this.state.myLocations.map((locations, index) => {
                return (
                    <>
                        <tr key={index}>
                            <td>{locations.name}</td>
                            <td>{locations.url}</td>
                            <td>{locations.address}</td>
                            <td>{locations.notes}</td>
                            <td><button><Link to='/editmylocation'>Edit</Link></button></td>
                            <td><button><Link to='/deletemylocation'>Delete</Link></button></td>
                        </tr>
                    </>
                )
            })
        } else {
            return <><tr><td colSpan={4}>No Listing Locations Currently. <Link to='/addmylocations'>Add One!</Link></td></tr></>
        }
    }


    render() {
        return (
            <div>
                <button><Link to='/addmylocations'>Add a Listing Location</Link></button>
                <table>
                    <thead>
                        <tr>
                            <th>Location Name</th>
                            <th>URL</th>
                            <th>Address</th>
                            <th>Notes</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{this.mapProducts()}</tbody>
                </table>
            </div>
        )
    }
};

export default ViewLocation
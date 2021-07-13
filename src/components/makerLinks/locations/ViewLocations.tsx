import {
    Link,
} from 'react-router-dom';
import React from 'react'
import { LocationInfo } from '../../../Interfaces';
import APIURL from '../../../helpers/environment'
import EditLocation from './EditLocation'
import DeleteLocation from './DeleteLocation'
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Delete, Clear } from '@material-ui/icons'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


interface ViewLocationProps extends WithStyles<typeof styles> {
    sessionToken: string,
    currentUserId: number | undefined,
    // adminStatus: boolean,
    // userRole: string,
    // updateSessionToken: (newToken: string) => void,
    // clearLocalStorage: () => void,
    // updateUserInfo: (role: string, admin:boolean) => void,
}

type ViewLocationState = {
    myLocations: LocationInfo[],
    editLocationView: boolean,
    deleteLocationView: boolean,
    locationToChange: number | null
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
    },
    modal: {
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'grey',
        border: '2px solid #000',
        borderRadius: 10,
        padding: '10px',
        '& Button' :{
            margin: '5px'
        }
    },
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

class ViewLocation extends React.Component<ViewLocationProps, ViewLocationState>{
    constructor(props: ViewLocationProps) {
        super(props)
        this.state = {
            myLocations: [],
            editLocationView: false,
            deleteLocationView: false,
            locationToChange: null
        }
    }

    fetchMyLocations() {
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
        this.fetchMyLocations()
    }

    mapProducts() {
        if (this.state.myLocations.length > 0) {
            return this.state.myLocations.map((locations, index) => {
                return (
                    <>
                        <TableRow key={index}>
                            <StyledTableCell>{locations.name}</StyledTableCell>
                            <StyledTableCell>{locations.url}</StyledTableCell>
                            <StyledTableCell>{locations.address}</StyledTableCell>
                            <StyledTableCell>{locations.notes}</StyledTableCell>
                            <StyledTableCell><Button variant="contained" onClick={() => { this.changeEditView(); this.setLocationToChange(locations.id) }}>Edit</Button></StyledTableCell>
                            <StyledTableCell><Button variant="contained" color="secondary" onClick={() => { this.changeDeleteView(); this.setLocationToChange(locations.id) }}><Delete />Delete</Button></StyledTableCell>
                        </TableRow>
                    </>
                )
            })
        } else {
            return <><TableRow><StyledTableCell colSpan={4}>No Listing Locations Currently. <Link to='/addmylocations'>Add One!</Link></StyledTableCell></TableRow></>
        }
    }

    setLocationToChange(id: number | null) {
        this.setState({
            locationToChange: id
        })
    }

    changeEditView = () => {
        this.setState({
            editLocationView: !this.state.editLocationView
        })
    }

    changeDeleteView = () => {
        this.setState({
            deleteLocationView: !this.state.deleteLocationView
        })
    }

    // editLocationView() {
    //     return (
    //         <div>
    //             <Button variant="contained" onClick={this.changeEditView}><Clear /></Button>
    //             <EditLocation fetchMyLocations={this.fetchMyLocations} sessionToken={this.props.sessionToken} changeEditView={this.changeEditView} setLocationToChange={this.setLocationToChange} locationToChange={this.state.locationToChange} />
    //         </div>
    //     )
    // }

    // deleteLocationView() {
    //     return (
    //         <div>
    //             <Button variant="contained" onClick={this.changeDeleteView}><Clear /></Button>
    //             <DeleteLocation fetchMyLocations={this.fetchMyLocations} currentUserId={this.props.currentUserId} sessionToken={this.props.sessionToken} changeDeleteView={this.changeDeleteView} setLocationToChange={this.setLocationToChange} locationToChange={this.state.locationToChange} />
    //         </div>
    //     )
    // }

    // viewController() {
    //     if (this.state.editLocationView) {
    //         return <>{this.editLocationView()}</>
    //     } else if (this.state.deleteLocationView) {
    //         return <>{this.deleteLocationView()}</>
    //     } else {
    //         return (
    //             <>                
    //                 <h2>Listing Locations</h2>
    //                 <Button variant="contained"><Link to='/addmylocations' style={{ textDecoration: 'none' }}>Add a Listing Location</Link></Button>
    //                 <StyledTable>
    //                     <TableHead>
    //                         <StyledTableRow>
    //                             <StyledTableCell>Location Name</StyledTableCell>
    //                             <StyledTableCell>URL</StyledTableCell>
    //                             <StyledTableCell>Address</StyledTableCell>
    //                             <StyledTableCell>Notes</StyledTableCell>
    //                             <StyledTableCell></StyledTableCell>
    //                             <StyledTableCell></StyledTableCell>
    //                         </StyledTableRow>
    //                     </TableHead>
    //                     <TableBody>{this.mapProducts()}</TableBody>
    //                 </StyledTable>
    //             </>
    //         )
    //     }
    // }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.mainDiv}>
                {/* {this.viewController()} */}
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.editLocationView}
                    onClose={this.changeEditView}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={this.state.editLocationView}>
                        <div className={classes.modalContent}>
                <Button variant="contained" onClick={this.changeEditView}><Clear /></Button>
                <EditLocation fetchMyLocations={this.fetchMyLocations} sessionToken={this.props.sessionToken} changeEditView={this.changeEditView} setLocationToChange={this.setLocationToChange} locationToChange={this.state.locationToChange} />
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={this.state.deleteLocationView}
                    onClose={this.changeDeleteView}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}>
                    <Fade in={this.state.deleteLocationView}>
                        <div className={classes.modalContent}>
                        <Button variant="contained" onClick={this.changeDeleteView}><Clear /></Button>
                <DeleteLocation fetchMyLocations={this.fetchMyLocations} currentUserId={this.props.currentUserId} sessionToken={this.props.sessionToken} changeDeleteView={this.changeDeleteView} setLocationToChange={this.setLocationToChange} locationToChange={this.state.locationToChange} />
                        </div>
                    </Fade>
                </Modal>
                <>                
                    <h2>Listing Locations</h2>
                    <Button variant="contained"><Link to='/addmylocations' style={{ textDecoration: 'none' }}>Add a Listing Location</Link></Button>
                    <StyledTable>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Location Name</StyledTableCell>
                                <StyledTableCell>URL</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Notes</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>{this.mapProducts()}</TableBody>
                    </StyledTable>
                </>
            </div>
        )
    }
};

export default withStyles(styles)(ViewLocation)
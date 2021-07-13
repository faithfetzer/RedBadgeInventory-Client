import React from 'react';
import {withStyles} from '@material-ui/core/styles';


const styles = {
    welcome: {
        display: 'flex-column',
        border: '3px solid',
        borderRadius: '12px',
        margin: 10,
        color: '#1C448E',
        width: '50%',
        marginRight: '25%',
        marginLeft: '25%',
    }
}

const Welcome = (props: any) => {
    const {classes} = props
    return(
        <div className={classes.welcome}>
            <h1>Welcome</h1>
            <p>This inventory manager was made for makers and artists to keep track of the items they have for sale and where they may have them listed, such as various online marketplaces, in local stores etc.<br/> It also has a feature for buyers (primarily wholesale) to view what items are available for sale from all makers. <br/>Feel free to create an account! <br/>If you are a buyer, you can always switch to maker later if you start creating your own product!</p>
        </div>
    )
}

export default withStyles(styles)(Welcome)
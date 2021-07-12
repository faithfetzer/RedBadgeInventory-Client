import { Row } from 'reactstrap';
import { BottomNavigation } from '@material-ui/core';

const Footer = () => {
    return (
        <footer style={{ 'position': 'absolute', 'bottom': 5, 'minWidth': '100vw', 'marginTop': 10 }}>
            <>&copy; Faith Fetzer 2021, Eleven Fifty Academy</>
        </footer>
    )
}

export default Footer;
let APIURL: string = '';

switch (window.location.hostname) {
    case "localhost" || '127.0.0.1':
        console.log(window.location.hostname)
        // APIURL ='https://fef-inventory-server.herokuapp.com'
        APIURL = 'http://localhost:4000';
        break;
    default:
    case 'deployed':
        APIURL = 'https://fef-inventory-server.herokuapp.com'
}

export default APIURL;
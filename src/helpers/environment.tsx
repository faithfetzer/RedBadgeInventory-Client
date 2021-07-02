let APIURL: string = '';

switch (window.location.hostname){
    case "localhost" || '127.0.0.1' :
        console.log(window.location.hostname)
        APIURL = 'http://localhost:4000';
        break;
    default:
    case 'deployed' :
        APIURL = 'server url'
}

export default APIURL;
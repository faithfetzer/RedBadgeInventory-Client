import React from 'react';
import './App.css';
import Footer from './site/Footer';
import Header from './site/Header';
import Auth from './components/auth/Auth';
import Sidebar from './site/Sidebar'
import {createStyles, withStyles, WithStyles} from '@material-ui/core/styles'

type AppState = {
  sessionToken: string,
  userRole: string,
  adminStatus: boolean | null,
  currentUserId: number | undefined
}

const styles = () => createStyles({
  mainDiv: {
    minHeight: '100vh',
    backgroundColor: '#86BBD8',
    color: '#011627',
    // '& Button' :{
    //   backgroundColor: '#CCD7C5',
    // },
  }
});

interface Props extends WithStyles<typeof styles>{ }

class App extends React.Component<Props, AppState>{
  constructor(props: Props){
    super(props)
    this.state = {
      sessionToken: '',
      userRole: '',
      adminStatus: null,
      currentUserId: undefined
    }
    this.updateSessionToken = this.updateSessionToken.bind(this)
    this.checkLocalStorage = this.checkLocalStorage.bind(this)
  }

  updateSessionToken(newToken: string){
    // console.log('update',newToken)
    this.setState({
      sessionToken: newToken
    })
  }

  checkLocalStorage(){
    let localToken= localStorage.getItem('token')
    let localUser: any= localStorage.getItem('role')
    let localAdminStatus: any= localStorage.getItem('admin')
    if(localAdminStatus === 'true'){
      localAdminStatus = true
    } else{
      localAdminStatus = false
    }
    if(localToken){
        this.setState({
            sessionToken: localToken,
            userRole: localUser,
            adminStatus: localAdminStatus
        })
    }
  }

  updateLocalStorage(newToken: string, role: string, adminStatus: boolean| null){
    let adminStatusString = adminStatus ? 'true' : 'false'
    console.log("admin", adminStatus)
    localStorage.setItem("token", newToken)
    localStorage.setItem("role", role);
    localStorage.setItem("admin", adminStatusString);
  };

  clearLocalStorage = () => {
    localStorage.clear()
    this.setState({
      sessionToken: ''
    })
    this.checkLocalStorage()
  };

  updateUserInfo= (role: string, admin:boolean, userID: number) => {
    console.log('update user info')
    this.setState({
      userRole: role,
      adminStatus: admin,
      currentUserId: userID
    }, () =>console.log(this.state))
  }

  componentDidMount(){
    console.log('mounted state', this.state)
    this.checkLocalStorage()
  }

  componentWillUnmount(){
    console.log('unmounted state', this.state)
    this.clearLocalStorage()
  }

  componentDidUpdate(){
    console.log('updated state', this.state)
  }

  protectedView(){
    return this.state.sessionToken ? 
      <><Header sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} currentUserId={this.state.currentUserId}/>
      <Sidebar sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} currentUserId={this.state.currentUserId}/>
      {/* <Display sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} productFeedView={this.state.productFeedView} myItemView={this.state.myItemView} notProductView={this.notProductView} myLocationView={this.state.myLocationView} myAccountView={this.state.myAccountView} adminAccountManager={this.state.adminAccountManager} updateMyLocationView={this.updateMyLocationView} updateMyItemView={this.updateMyItemView} updateMyAccountView={this.updateMyAccountView} updateAdminAccount={this.updateAdminAccount} productView={this.productView} notMyAccountView={this.notMyAccountView} notAdminAccount={this.notAdminAccount} notMyItemView={this.notMyItemView} notMyLocationView={this.notMyLocationView}/>*/}</>
      : <><Auth sessionToken={this.state.sessionToken} userRole={this.state.userRole} currentUserId={this.state.currentUserId} adminStatus={this.state.adminStatus} updateSessionToken={this.updateSessionToken} updateLocalStorage={this.updateLocalStorage} clearLocalStorage={this.clearLocalStorage} updateUserInfo={this.updateUserInfo}/></>
  }

  render(){
    const {classes} = this.props
    return (
      <div className="App">
        <div className={classes.mainDiv}>
          {this.protectedView()}
          <Footer />
      </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);

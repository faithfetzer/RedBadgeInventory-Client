import React from 'react';
import './App.css';
import Footer from './site/Footer';
import Header from './site/Header';
import Display from './site/Display';
import Auth from './components/auth/Auth';
import Sidebar from './site/Sidebar'

type AppState = {
  sessionToken: string,
  userRole: string,
  adminStatus: boolean | null,
  currentUserId: number | undefined
}

class App extends React.Component<{}, AppState>{
  constructor(props: {}){
    super(props)
    this.state = {
      sessionToken: '',
      userRole: '',
      adminStatus: null,
      currentUserId: undefined
    }
    this.updateSessionToken = this.updateSessionToken.bind(this)
    this.checkSessionToken = this.checkSessionToken.bind(this)
  }

  updateSessionToken(newToken: string){
    // console.log('update',newToken)
    this.setState({
      sessionToken: newToken
    })
  }

  checkSessionToken(){
    let localToken= localStorage.getItem('token')
    if(localToken){
        this.setState({
            sessionToken: localToken
        })
    }
  }

  updateLocalStorage(newToken: string, role: string, adminStatus: boolean){
    console.log("admin", adminStatus)
    localStorage.setItem("token2", newToken)
    localStorage.setItem("role", role);
    // localStorage.setItem("admin", adminStatus);
  };

  clearLocalStorage = () => {
    localStorage.clear()
    this.setState({
      sessionToken: ''
    })
    this.checkSessionToken()
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
    this.checkSessionToken()
  }


  protectedView(){
    return this.state.sessionToken ? 
      <><Header sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} currentUserId={this.state.currentUserId}/>
      <Sidebar sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} currentUserId={this.state.currentUserId}/>
      {/* <Display sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} productFeedView={this.state.productFeedView} myItemView={this.state.myItemView} notProductView={this.notProductView} myLocationView={this.state.myLocationView} myAccountView={this.state.myAccountView} adminAccountManager={this.state.adminAccountManager} updateMyLocationView={this.updateMyLocationView} updateMyItemView={this.updateMyItemView} updateMyAccountView={this.updateMyAccountView} updateAdminAccount={this.updateAdminAccount} productView={this.productView} notMyAccountView={this.notMyAccountView} notAdminAccount={this.notAdminAccount} notMyItemView={this.notMyItemView} notMyLocationView={this.notMyLocationView}/>*/}</>
      : <><Auth sessionToken={this.state.sessionToken} userRole={this.state.userRole} currentUserId={this.state.currentUserId} adminStatus={this.state.adminStatus} updateSessionToken={this.updateSessionToken} updateLocalStorage={this.updateLocalStorage} clearLocalStorage={this.clearLocalStorage} updateUserInfo={this.updateUserInfo}/></>
  }

  render(){
    return (
      <div className="App">
          {this.protectedView()}
          <Footer/>
      </div>
    );
  }
}

export default App;

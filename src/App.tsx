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
  adminStatus: boolean,
  productFeedView: boolean,
  myAccountView: boolean,
  adminAccountManager: boolean,
  myItemView: boolean,
  myLocationView: boolean
}

class App extends React.Component<{}, AppState>{
  constructor(props: {}){
    super(props)
    this.state = {
      sessionToken: '',
      userRole: '',
      adminStatus: false,
      productFeedView: true,
      myAccountView: false,
      adminAccountManager: false,
      myItemView: false,
      myLocationView: false
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

  updateLocalStorage(newToken: string){
    localStorage.setItem("token", newToken);
  };

  clearLocalStorage = () => {
    localStorage.clear()
    this.setState({
      sessionToken: ''
    })
    this.checkSessionToken()
  };

  updateUserInfo= (role: string, admin:boolean) => {
    console.log('update user info')
    this.setState({
      userRole: role,
      adminStatus: admin
    })
  }

  componentDidMount(){
    this.checkSessionToken()
  }

  updateProductView(){
    this.setState({
      productFeedView: !this.state.productFeedView
    })
  }

  updateMyAccountView(){
    this.setState({
      myAccountView: !this.state.myAccountView
    })
  }

  updateAdminAccount(){
    this.setState({
      adminAccountManager: !this.state.adminAccountManager
    })
  }

  updateMyItemView(){
    this.setState({
      myItemView: !this.state.myItemView
    })
  }

  updateMyLocationView(){
    this.setState({
      myLocationView: !this.state.myLocationView
    })
  }

  protectedView(){
    return this.state.sessionToken ? 
      <><Header sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} productFeedView={this.state.productFeedView} myAccountView={this.state.myAccountView} adminAccountManager={this.state.adminAccountManager} updateProductView={this.updateProductView} updateMyAccountView={this.updateMyAccountView} updateAdminAccount={this.updateAdminAccount} myItemView={this.state.myItemView} myLocationView={this.state.myLocationView} updateMyLocationView={this.updateMyLocationView} updateMyItemView={this.updateMyItemView}/>
      <Sidebar sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} productFeedView={this.state.productFeedView} myItemView={this.state.myItemView} myLocationView={this.state.myLocationView} myAccountView={this.state.myAccountView} adminAccountManager={this.state.adminAccountManager} updateMyLocationView={this.updateMyLocationView} updateMyItemView={this.updateMyItemView} updateMyAccountView={this.updateMyAccountView} updateProductView={this.updateProductView} updateAdminAccount={this.updateAdminAccount}/>
      <Display sessionToken={this.state.sessionToken} updateSessionToken={this.updateSessionToken} clearLocalStorage={this.clearLocalStorage} userRole={this.state.userRole} adminStatus={this.state.adminStatus} updateUserInfo={this.updateUserInfo} productFeedView={this.state.productFeedView} myItemView={this.state.myItemView} myLocationView={this.state.myLocationView} myAccountView={this.state.myAccountView} adminAccountManager={this.state.adminAccountManager} updateMyLocationView={this.updateMyLocationView} updateMyItemView={this.updateMyItemView}/></>
      : <><Auth sessionToken={this.state.sessionToken} userRole={this.state.userRole} updateUserInfo={this.updateUserInfo} updateSessionToken={this.updateSessionToken} updateLocalStorage={this.updateLocalStorage} clearLocalStorage={this.clearLocalStorage}/></>
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

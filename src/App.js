import React ,{Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";


import './assets/css/layout.css'
import 'antd/dist/antd.css'

import './assets/css/dashboard.css'
import './assets/css/layout.css'
import './assets/css/structure.css'
import './assets/css/sideNav.css'
import './assets/css/article.css'

import './assets/css/LoginLayout.css'
import './assets/css/FormLayout.css'
//import CustomLayout from './components/containers/layout'

import GeneralRouter from './routes'


class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

    render() {
        return (
            <div>
            <Router>
            <GeneralRouter />
            </Router>

            </div>
        )
    }
}




const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
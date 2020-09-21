import React from "react";

import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";

import {authLogin} from '../../store/actions/auth'



import {
  Form,
  Select,
  Input,
  notification
} from "antd";

const Search = Input.Search;
const { Option } = Select;


class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };
 
  //handleChange = e => {
    //this.setState({ [e.target.name]: e.target.value });
  //};

  handleSubmit = (values) => {
    
  const username = values['username'] 
  const password  = values['password']

    this.setState({
      username :  values['username'] ,
      password : values['password']
    })
    this.props.login(username, password)
    .then((res) => {
        alert('works')  
    }).catch((err) => {
      alert('failed')  
    });
  }

  openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      
    });
  }

  render() {
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      //this.openNotification('Login Successful')
      return <Redirect to="/Dashboard/" />;
    }
    const formItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };
    return (

            <>
   
                  <div className="access-form-layout">
                            <div className="access-form-image">
                              <div className="access-form-bg-image">
                                <div className="access-header-intro">
                                    <h3>
                                   Seplat NewsLetter
                                    </h3>
                                    
                                </div>
                              </div>
                            </div>


                            <div className="access-form-box">
                            <nav class="access-main-nav">
                                  <ul>
                                    <li>
                                      <Link to="/">
                                      <div className="ExciteLogoContainer">
                                      <img
                                      pr ="LoginForm"
                                      className=""
                                     /> 
                                      </div>
                                      </Link>
                                    </li>
                                  
                                  </ul>
                                </nav>

                            <div className="form-box">

                                      <div className="login-welcome-intro">
                                                      <h3>
                                                        Welcome Back 
                                                      </h3>
                                            </div>

                                            <Form className="form-box-width"
                                                      onFinish={this.handleSubmit}>
                                          
                                                  <Form.Item 
                                                  rules={[{ required: true, message:'Username is required' }]}
                                                  name ="username">
                                                  <Input
                                                  size="large"
                                                  placeholder="Username" />

                                                    
                                                  </Form.Item>
                                                  <Form.Item

                                                  rules={[{ required: true, message:'Password is required' }]}
                                                  name ='password'> 

                                                  <Input.Password 
                                                  size="large"
                                                  placeholder=" password" />
                                                    
                                                  </Form.Item>

                                                  <Form.Item >
                                                    <button
                                                      class="custom-button"
                                                    htmlType="submit">
                                                      Login
                                                    </button>
                                                  </Form.Item>

                                                  </Form>

                                     <div className="">
                                              <Link to="/select-account/">
                                               <p className="access-suggestion">
                                              New here ? Sign Up
                                                </p>
                                              </Link>
                                              <br/>

                                              <Link to="/login/">
                                               <p className="access-suggestion">
                                               Forgot Password ? 
                                                </p>
                                              </Link>
                                             
                                      </div>

                                      </div>
                           
                            </div>
                </div>

       
            </>

    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

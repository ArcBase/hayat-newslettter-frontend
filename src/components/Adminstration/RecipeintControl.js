
import React, { Component } from 'react'
import Pusher from 'pusher-js';
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import {Input   , Form, Button, notification  ,message} from 'antd';
import SideDash from '../containers/sideNav';



const host='http://127.0.0.1:8000'

class Admin_Control extends Component{
    state ={
        carbon_mails : [],
        blind_carbon_mails : [],
    }

    //CRUD CC MAILS
    CC_Mails = async()=>{
        await axios.get(host + `/api/carbon_copy_mails/`)
        .then(res =>{
            this.setState({
                carbon_mails:res.data
            })
        })
    }

    add_cc_mail =async(values)=>{
        const email = values['email']
        await axios.get(host + `/api/add_cc/`, {
            params :{
                email
            }
        })
        .then(res =>{
            this.CC_Mails()
             message.success(res.data['Message'])
        })
    }

    delete_cc = async(news_id)=>{
        await axios.get(host + `/api/delete_cc/${news_id}`)
        .then(res =>{
            this.CC_Mails()
             message.success(res.data['Message'])
        })
    }

    //ENDS HERE

    //CRUD CC MAILS
    BCC_Mails = async()=>{
        await axios.get(host + `/api/blind_carbon_copy_mails/`)
        .then(res =>{
            this.setState({
                blind_carbon_mails:res.data
            })
        })
    }

    add_Bcc_mail =async(values)=>{
        const email = values['email']
        await axios.get(host + `/api/add_bcc/`, {
            params :{
                email
            }
        })
        .then(res =>{
            this.BCC_Mails()
            message.success(res.data['Message'])
        })
    }

    delete_Bcc = async(news_id)=>{
        await axios.get(host + `/api/delete_Bcc/${news_id}`)
        .then(res =>{
            this.BCC_Mails()
             message.success(res.data['Message'])
        })
    }

    // ENDS HERE

    componentDidMount(){
        this.CC_Mails();
        this.BCC_Mails()
    }

    
    render(){
        
            const {carbon_mails, blind_carbon_mails} = this.state
            const {isAuth} = this.props
         if (isAuth == true){

        }else{
            this.props.history.push('/login')
        }
        return(
            
            <>


               <div className="wrapper">

                    <SideDash/>

                    <div className="main">
                    <div className="container mx-auto my-auto py-4">
            <div className="grid grid-cols-6">
            
                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                          <div className="base-card">

                        <table>
                                <tr>
                                <th>
                                    <p className="client-text">
                                    Email
                                        </p>
                                        </th>
                                <th>
                                    <p className="client-text">
                                    Delete
                                    </p>

                                </th>
                                
                                </tr>
                               
                               {
                                   carbon_mails.map((c)=>(
                                    <tr>
                                <td>
                                    <p className="client-text">
                                    {c.EmailName}
                                    </p>
                                </td>
                                <td> 
                                <p
                                className="client-text"
                                onClick={()=>{this.delete_cc(c.id)}}>
                                Delete
                                </p>
                                </td>
                                
                                </tr>
                                   ))
                               }
                            
                            </table>

                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
                            
                        <div className="base-card">
                        <Form  onFinish={this.add_cc_mail}>
                            <Form.Item>
                            <h1 className="ant-form-text">Add a new mail contact</h1>
                            </Form.Item>
                

                            <Form.Item name ="email">
                                <Input
                                placeholder="Add the Recipient Email"                                
                                
                                />
                            </Form.Item>
                            
                        
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>

                </Form>
                    
                        </div>

                        </div>
            </div>
              </div>


              <div className="container mx-auto my-auto">
            <div className="grid grid-cols-6">
            
                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                          <div className="base-card">

                        <table>
                        <tr>
                                <th>
                                    <p className="client-text">
                                    Email
                                        </p>
                                        </th>
                                <th>
                                    <p className="client-text">
                                    Delete
                                    </p>

                                </th>
                                
                                </tr>
                               
                               {
                                blind_carbon_mails.map((c)=>(
                                    <tr>
                            
                            <td>
                                    <p className="client-text">
                                    {c.EmailName}
                                    </p>
                                </td>

                                <td> 
                                <p
                                    className="client-text"
                                onClick={()=>{this.delete_Bcc(c.id)}}>
                                Delete
                                </p>
                                </td>
                                
                                </tr>
                                   ))
                               }
                            
                            </table>

                        </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
                            
                        <div className="base-card">
                        <Form  onFinish={this.add_Bcc_mail}>
                            <Form.Item>
                            <h1 className="ant-form-text">Add a new BCC contact</h1>
                            </Form.Item>
                

                            <Form.Item name ="email">
                                <Input
                                placeholder="Add the Recipient BCC Email"                                
                                
                                />
                            </Form.Item>
                            
                        
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>

                </Form>
                    
                        </div>

                        </div>
            </div>
              </div>
                    </div>
                   
               </div>

            </>

        )
    }

}


const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,

    };
};


  
export default connect(
    mapStateToProps,
    
)(Admin_Control) 
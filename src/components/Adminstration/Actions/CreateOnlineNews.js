import React, { Component } from 'react'
import {Input ,   Form, 
Select ,notification} from 'antd';
import { connect } from "react-redux";

import { Link } from 'react-router-dom';
import SideDash from '../../containers/sideNav'
import axios from 'axios'
//import TemporaryDrawer from '../Sidebar/SideNav'


const TextArea = Input.TextArea
const { Option } = Select;


const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  }); 
}

const HeritageKeywords = [
  'Stock Market Nigeria' , 'First Bank of Nigeria' ,'Foreign Exchange Nigeria' , 'Central Bank of Nigeria' ,
  'Industry Nigeria' ,'Insurance Nigeria' ,'Stock Market' ,'Regulators Nigeria' ,
  'Real Estate Nigeria' ,'Agriculture Nigeria' ,'Mininng Nigeria' ,'Oil and Gas Nigeria' , 
  'APC Nigeria' ,'PDP Nigeria' ,'Buhari Nigeria','General News Nigeria','Nigeria'
      ]
       

const MainCategory = ['Banking' ,'Business Nigeria' ,'Economy' ,'Politics Nigeria','Nigeria']



 const NewsSource = ['Punch','ThisDay' ,'Daily Independent' ,'Pulse.ng', 
        'PM News','Sun','This Day','Sahara Reporters' ,'The Nation','Nairametrics',
        'Prosshare','Blueprrint','BusinessAM','Ventures Africa','Forbes Africa'
      ]

const host='https://backend-hayat.herokuapp.com'
 class CampaignCreateOnline extends Component{
    state = {
        newImage:[] ,
    }

    handleImageChange = (e) => {
        this.setState({
          newImage: e.target.files[0]
        })
      }; 


    Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        const Content = 
           values["Content"] === undefined ? null : values["Content"] ; 
        // const Publisher =
          // values["Publisher"] === undefined ? null : values["Publisher"] ;
        const Source = values['Source']
        const MainCategory = values['MainCategory']
        const Category = values['Category']
       const  Link =
          values["Link"] === undefined ? null : values["Link"] ;

        
          const Image = this.state.newImage


          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('MainCategory',MainCategory)
          form_data.append('Category',Category)
          form_data.append('Source',Source)
          form_data.append('Content', Content);
          
          // form_data.append('Publisher',Publisher);
          form_data.append('Link', Link);
          form_data.append('Image', Image)
          

        const upload_url= host + `/api/create-online-campaign/`
        axios.post(upload_url,form_data )
        .then(res =>{
            if (res.status == 200){
            console.log(res.data)
        const take_response = res.data['Message']
        openNotification(take_response)  
        this.props.history.push("/campaignList") 
            }  else{
                openNotification('Error Creating Product') 
            }  
        })
            
          }
        
      
    
    componentDidMount(){

    }

    render(){
        
        return(
            <>

                <div className="wrapper">
                    <SideDash/>


                        <div className="main">
                            
            <div className="fitter">
                <div className="page-grid">
                    <div className="left">


                  <div className="form-container">
                    <div className="form-box">
                      
                    <Form 
                        className="form-box-width"
                         onFinish={this.Create_Query}>

                        <Form.Item
                             rules={[{ required: true }]}
                             name ='MainCategory' >
                                
                                <Select placeholder="Section">
                                {
                                  MainCategory.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                              <Form.Item
                             rules={[{ required: true }]}
                             name ='Category' >
                                
                                <Select placeholder="Select Category">
                                {
                                  HeritageKeywords.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>
                            
                            
                              
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Title">
                            
                                <Input
                                placeholder="Title"
                                enterButton
                                />
                            
                            </Form.Item>




                            <Form.Item 
                             rules={[{ required: true }]}
                            name="Content">
                          <TextArea 
                            placeholder="Content" rows={4} />
                          </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Source" >
                                
                                <Select placeholder="Select Source">
                                {
                                  NewsSource.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Link">
                            
                                <Input
                                placeholder="News Source Link"
                                enterButton
                                />
                            
                            </Form.Item>

                         <Form.Item 
                           rules={[{ required: true }]}
                          name="Image_Post">

                          <Input  type="file"
                         
                            onChange={this.handleImageChange}
                          name="Post_Image1" />

                          </Form.Item>

                          

                          <Form.Item >
                          <button
                            class="form-submit-button"
                          htmlType="submit">
                            Create
                          </button>
                        </Form.Item>

                       </Form>

                    </div>
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
    token: state.auth.token
  };
};

//   const mapDispatchToProps = dispatch => {
//     return {
//       refreshCart: (token) => dispatch(fetchCart(token))
//     };
//   };

export default connect(
  mapStateToProps,
  null
)(CampaignCreateOnline);

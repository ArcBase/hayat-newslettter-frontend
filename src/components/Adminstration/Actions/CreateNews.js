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


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};
 

const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const NewsSource = ['Punch','ThisDay' ,'Daily Independent' ,'Pulse.ng', 
'PM News','Sun','This Day','Sahara Reporters' ,'The Nation','Nairametrics','Prosshare','Tribune','Daily Independent',
'Blueprrint','BusinessAM','Ventures Africa','Forbes Africa'
]
const MainCategory = ['Banking' ,'Business Nigeria' ,'Economy' ,'Politics Nigeria','Nigeria']

// const SeplatKeywords = ['Seplat' , 'Business' ,'Economy', 'Central Bank of Nigeria' , 'Power' ,'Marginal Oil Field' , 'OML', 
//         'Seplat' ,'Alteo' ,'Amni', 'Exxon Mobi' ,'Policy' ,'African Oil' ,'Exploration' , 'Politics' ,'Niger Delta', 
//         'Nimasa' ,'Fedral Goverment of Nigeria' ,' Oil Vessels' ,'NUPENG' ,'Host Communities' , 'Shut Down' ,'Internation Oil Company',
//         'National Oil Companies' , 
//         ]

      

 const HeritageKeywords = [
  'Stock Market Nigeria' , 'First Bank of Nigeria' ,'Foreign Exchange Nigeria' , 'Central Bank of Nigeria' ,
  'Industry Nigeria' ,'Insurance Nigeria' ,'Stock Market' ,'Regulators Nigeria' ,
  'Real Estate Nigeria' ,'Agriculture Nigeria' ,'Mininng Nigeria' ,'Oil and Gas Nigeria' , 
  'APC Nigeria' ,'PDP Nigeria' ,'Buhari Nigeria','General News Nigeria','Nigeria'
      ]
       
      

const host='http://127.0.0.1:8000'
 class CampaignCreate extends Component{
    state = {
        newImage:[] ,
        category : [],
    }

    handleImageChange = (e) => {
        this.setState({
          newImage: e.target.files[0]
        })
        console.log(e.target.files[0])
      };


      Category_List = async() =>{
        await  axios.get(host + `/api/categories/`)
        .then(res =>{
            this.setState({
            category : res.data ,
            loading: false ,
            })
            console.log(res.data)
        
        })
    }

    Create_Query = async(values, err)=>{
      const MainCategory = values['MainCategory']
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        const Content = 
           values["Content"] === undefined ? null : values["Content"] ; 
        const Publisher =
          values["Publisher"] === undefined ? null : values["Publisher"] ;
        const Category = values['Category']
       const  Link =
          values["Link"] === undefined ? null : values["Link"] ;
        
        const NewsType = 'Offline'
        const Source = values['Source']

        
          const Original_User_id = this.state.Owner
         // const Category = parseInt(this.Category_ID)
          const Image = this.state.newImage


          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('MainCategory',MainCategory)
          form_data.append('Title',Title);
          form_data.append('Category',Category)
          form_data.append('Content', Content);
          form_data.append('Publisher', Content);
          form_data.append('NewsType', NewsType);
          form_data.append('Source',Source);
          form_data.append('Link', Link);
          form_data.append('Image', Image)
          

        const upload_url= host + `/api/create-offline-campaign/`
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
      this.Category_List()
    }

    render(){
        const {category} =this.state
        
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
                                
                                <Select placeholder="Select Pubslisher">
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
)(CampaignCreate);

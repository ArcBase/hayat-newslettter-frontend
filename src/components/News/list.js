import React , { useState, Component }from 'react';
import {Input, Select , Form, Button , notification } from 'antd';
import { MessageOutlined, LikeOutlined, 
        StarOutlined, LoadingOutlined , DownloadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';

import News_Card_List from '../containers/News_Card'
import Filtered_News from '../containers/filtered_news_Card'

const Search = Input.Search;
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


const host='https://backend-hayat.herokuapp.com'

class News_List extends Component{
    state = {
        news : [],
        category: [],
        filter_results :[] ,
        loaded_results :false,
        loading: true,
    }

    Get_Latest_News = async()=>{
      await axios.get(host + `/api/get_latest_News/`)
      .then(res =>{
          openNotification(res.data['Message'])
      })
    }
    
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

    NewsList = () =>{
        axios.get(host + `/api/all_news/`)
        .then(res =>{
            this.setState({
            news : res.data ,
            loading: false ,
            })
            console.log(res.data)
            
        })
    }

    Select_News = async(news_id)=>{
        await axios.get(host + `/api/select_news/${news_id}`)
        .then(res =>{
            openNotification(res.data['Message'])
        })
    }

    Deselect_News = async(news_id) =>{
        await axios.get(host + `/api/deselect_news/${news_id}`)
        .then(res =>{
            openNotification(res.data['Message'])
        })
    }

    Process_Filter = (values,err)=>{
        
    const Category = 
        values["category"] === undefined ? null : values["category"] ;
    if(!err){
        axios.get(host + `/api/filter_news_by_category/`, {
            params: {
                Category
            }
        }).then(res =>{
            this.setState({
            filter_results: res.data,
            loaded_results : true,
            }); 
            console.log(res.data)
            
        }).catch(e =>{
            console.log(e)
        })
        }
    
    }

  
        
    componentDidMount(){
        this.NewsList()
        this.Category_List() 
    }

    render(){
        const {news , category,filter_results, loading, loaded_results} = this.state
            return (
                <>

        <div className=" container mx-auto">
              <div className="grid grid-cols-6   ">
                <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                  <div className="">
                  <h3 className="intro_header">
                      Seplat News Round Up <br/>
                      
                  </h3>
                <p className="intro_text">
                Get rid of delayed email notifications and wrong news sent
                 to your inbox from spam and clickbait sources. 
                We bring the solutions where you can get up-to-date news headlines as it happens to your inbox
                      </p>
                  </div> 
                
                </div>
                <div className="col-span-6 sm:col-span-6 sm:ml-3 md:col-span-6 lg:col-span-2 xl:col-span-2 ">
                    <img 
                      className =""
                      style = {{height: 270}}
                      src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" />
                    </div>
         
            </div>
              </div>


                <div className="container mx-auto my-auto py-4">
                    <div className="grid grid-cols-11">
                    <div className =" sm:col-span-10 md:col-span-10
                     lg:col-span-2 xl:col-span:2  py-2">

                        <Form onFinish = {this.Process_Filter}>
                        <Form.Item name = "category">
                        <Select
                       
                         placeholder ="Select a keyword">
                        <Option value=""></Option>
                        {
                            category.map((c)=>(
                                <Option value={c.id}>{c.Name}</Option>
                            ))
                        }
                        </Select>
                        </Form.Item>

                        <Form.Item>
                        <Button type="danger" htmlType="submit">
                          Search
                        </Button>
                      </Form.Item>
                        </Form>
                     
                         </div>
    
                            <div className="sm:col-span-10 md:col-span-10
                     lg:col-span-9 xl:col-span-9 ">
                                <div className="grid grid-cols-9 gap-3">
                                {
                                            !loaded_results ? (
                                    <>
                                            
                                        {
                                        news.map((n)=>(
                                            <div className=" sm:col-span-10 md:col-span-10
                                                lg:col-span-3 xl:col-span-3 ">
                                            <News_Card_List
                                            key = {n.id}
                                            id = {n.id}
                                                Title={n.Title}
                                            Content ={n.Content}
                                             Images = {n.Images}
                                            Keyword = {n.Keyword}
                                            Link = {n.Link}
                                            Selected = {n.Selected}
                                            
                                            Publish = {n.Publish}
                                                />
                                                </div>
                                            ))
                                        }
                             
                                    </>
                                            ) : (
                                                <>
                                            {
                                                filter_results.map((n)=>(
                                                    <div className=" sm:col-span-10 md:col-span-10
                                                lg:col-span-3 xl:col-span-3 ">
                                                        <Filtered_News
                                            key = {n.id}
                                            id = {n.id}
                                                Title={n.Title}
                                            Content ={n.Content}
                                            Images = {n.Images}
                                            Keyword = {n.Keyword}
                                            Link = {n.Link}
                                            Selected = {n.Selected}
                                            Publish = {n.Publish}
                                                /> 
                                                </div>
                                                ))
                                                
                                            }  
                                                </>
                                            )
                                        }

                                </div>
                            </div>
                                        

                                        

                </div>                    
                </div>
                </>
        )
    }

}

export default News_List
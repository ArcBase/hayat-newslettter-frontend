import React , { useState, Component }from 'react';
import {Tag , notification} from 'antd';
import { AppstoreAddOutlined} from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';

 
const openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
const host=''
class News_Category_Selected extends Component{
    
    state = {
        news_list :[],
        loading : true,
        }

    get_category_news = async()=>{
        const Category_ID = this.props.match.params.CategoryID
        axios.get(host + `/api/categorize/${Category_ID}/`)
        .then(res =>{
            this.setState({
                news_list: res.data,
                loading : true,
            }); 
            console.log(res.data)   
        }).catch(e =>{
            console.log(e)
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


    componentDidMount(){
        this.get_category_news()
    }

    render(){
        const {news_list , loading} = this.state
        return(
            <>
                <div className="container">
                    <div className="grid grid-cols-8 gap-4">
                       {
                           news_list.map((n) =>(
                            <div className=" col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-2 lg:col-span-2">
                       <div className="news-box">
                            <div className="news-box-container">
                                                           
                                <div className="news-box-heading">
                            <h4 className="news-box-headline" >
                            Headline
                            </h4>        
                             {n.Title.length < 25 ? 
                             `${n.Title}` : `${n.Title.substring(0, 60)}...` }
                                </div>
                                <hr/>

                                <div className="news-box-image">
                                   <img src= {n.Images} />
                                </div>

                                <div className="news-box-text">
                                <h4 className="news-box-headline">
                            Content
                            </h4>  
                               {n.Content.length < 55 ? 
                             `${n.Content}` : `${n.Content.substring(0, 100)}...` }
                                </div>

                                <hr/>
                                <div className="news-box-actions">
                                {
                                    !n.Selected?(
                                        <button
                                onClick ={()=>{this.Select_News(n.id)}}
                                 className="select-button">
                                        Select 
                                 <AppstoreAddOutlined  
                                 style={{ fontSize: '20px' }} 
                                  /> 
                                </button>
                              
                                    ):(
                                        <button
                                onClick ={()=>{this.Deselect_News(n.id)}}
                                 className="select-button">
                                       Unpick 
                                 <AppstoreAddOutlined  
                                 style={{ fontSize: '20px' }} 
                                  /> 
                                </button> 
                                    )
                                }
                                
                                </div>

                            </div>
                        </div> 
                       </div> 
                           ))
                       }
                    </div>
                </div>
            </>
        )
    }
}

export default News_Category_Selected
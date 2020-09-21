import React , { useState, Component }from 'react';
import {Input, Select , Form, Button , notification , Switch, message} from 'antd';
import { MessageOutlined, LikeOutlined, 
        StarOutlined, LoadingOutlined , DownloadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import SideDash from '../containers/sideNav'

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


const host='http://127.0.0.1:8000'

class NewsUpdate extends Component{
    state = {
        news : [],
        category: [],
        filteredNews :[] ,
        loaded_results :false,
        loading: true,

        notEmpty: false
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
            if (res.status == 200){
                this.setState({
                    news : res.data ,
                    loading: false ,
                    notEmpty: true
                    })
                    console.log(res.data)
                    
            } else{
                
            }
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

    Process_Filter = (values)=>{
        
    const Category =  values["category"] === undefined ? null : values["category"] ;
    
        axios.get(host + `/api/filter_news_by_category/`, {
            params: { Category}
        })
        .then(res =>{
            this.setState({
            filteredNews: res.data,
            loadedResults : true
                }); 
            console.log(res.data)
        })

    
    }
 

    Select_News = async(news_id)=>{
        await axios.get(host + `/api/select_news/${news_id}`)
        .then(res =>{
            if (res.status == 200){
                message.success(res.data['Message'])
               this.NewsList()
            }else{
                message.error('Selection Failed')
            }
        })
    }

    Deselect_News = async(news_id) =>{
        await axios.get(host + `/api/deselect_news/${news_id}`)
        .then(res =>{
            if (res.status == 200){
                this.NewsList()
                message.success(res.data['Message'])
            } else{

            }
        })
    }

  
        
    componentDidMount(){
        this.NewsList()
        this.Category_List() 
    }

    componentWillReceiveProps(){
        this.NewsList()
    }
    render(){
        const {news , category,filteredNews, notEmpty, loadedResults} = this.state
            return (
                <>

                    <div className="wrapper">
                            
                            <SideDash/>

                            

                        <div className="main">
                      

                    <div className="fitter">
                    <div className="page-grid">
                                <div className ="left">

                                   <div className="filter-form-box">
                                   <Form
                                   className="filter-form-box-width"
                                   onFinish = {this.Process_Filter}>
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
                                    <button
                                    className="select-button"
                                    type="danger" htmlType="submit">
                                    Filter
                                    </button>
                                </Form.Item>
                                    </Form>
                                   </div>
                                
                                    </div>
                                            </div>

                            <div className="">
                             
                            </div>
                     </div>  


                   
                    {
                        notEmpty ? (
                            <>
                              <div className="fitter">
                            <div className="page-grid">
                    
    
                    <div className="">
                        <div className="">
                        {
                                    !loadedResults ? (
                            <>
                                    
                         <div className="">
                                    <ul className="article-grid">
                                    {
                                        news.map((item)=>(
                                            <>
                                                <li className="article-grid-list">
                                            <div className="article-container">

                                                
                                                
                                <div className="">
                                        <ul className="articleInfo-container">
                                            <li className="articleInfo-list">
                                                <div className="articleContent">
                                                    <p className="articleContent-text">
                                                  
                                                    {item.Category.length < 18 ? 
                                                      `${item.Category}` : `${item.Category.substring(0,1)}` }
                                                    </p>
                                                </div>
                                            
                                            </li>

                                            <li className="articleInfo-list">
                                                <div className="articleContent2">
                                                    <Link to={`/editNewsItem/${item.id}`}>
                                                            Edit
                                                    </Link>
                                                </div>   
                                            </li>
                                        </ul>

                                    </div>


                                                <div className="article-image">
                                                {
                                                        item.UseFeedImage ? (
                                                            <img
                                                            
                                                    className=""
                                                    src={item.NewsImage} />
                                                        ) :(
                                                            <a href={item.Link}>
                                                                <img
                                                    className=""
                                                    src={item.Images} /> 
                                                            </a>
                                                        )
                                                    }
                                                </div>
                                                <div className="article-section">
                                                    
                                                    <a href={item.Link}>
                                                    <h4 className="article-title">
                                                      
                                                      {item.Title.length < 30 ? 
                                                    `${item.Title}` : `${item.Title.substring(0,50)}...` }
                                                  </h4>
                                                  <hr/>
                                                    </a>
                                                    

                                                    <div>
                                                    {
                                                        item.isOffline ? (
                                                            <>
                                                         <p className="article-source">
                                                                {item.Source} <sup >offline</sup>
                                                            </p>
                                                            </>
                                                        ) : (
                                                            <p className="article-source">
                                                                {item.Source}
                                                            </p>
                                                        )
                                                    }
                                                    
                                                    </div>
                                                    

                                                    <p className="article-text">
                                                  
                                                    {item.Publish.length < 160 ? 
                                                      `${item.Publish}` : `${item.Publish.substring(0,160)}...` }
                                                    </p>
                                                    
                                                </div>

                                             

                                                <div className="">
                                                    <ul className="articleButton-container">
                                                        <li className="articleButton-container-list">
                                                        <p className="articleButton-text">
                                                        {item.DateAdded}
                                                        </p>
                                                        </li>



                                                        <li className="articleButton-container-list">
                                                        {
                                                            item.selected ? (
                                                                <button
                                                                onClick={()=>{this.Deselect_News(item.id)}} 
                                                            className="articleButton-deselect">
                                                                Deselect
                                                            </button>
                                                            ) : (
                                                                <button
                                                                onClick={()=>{this.Select_News(item.id)}}
                                                                className="articleButton-select">
                                                                    Select
                                                                </button> 
                                                            )
                                                        }
                                                        </li>
                                                    </ul>
                                                </div>


                                                
                                            </div>
                                        </li>
                                            </>
                                         ))
                                    }   
                                    </ul>
                        </div>
                               

                            </>
                                    ) : (
                                        <>
                                   <div className="">
                                    <ul className="article-grid">
                                    {
                                        filteredNews.map((item)=>(
                                            <>
                                                 <li className="article-grid-list">
                                            <div className="article-container">

                                                
                                                
                                <div className="">
                                        <ul className="articleInfo-container">
                                            <li className="articleInfo-list">
                                                <div className="articleContent">
                                                    <p className="articleContent-text">
                                                  
                                                    {item.Category.length < 18 ? 
                                                      `${item.Category}` : `${item.Category.substring(0,1)}` }
                                                    </p>
                                                </div>
                                            
                                            </li>

                                            <li className="articleInfo-list">
                                                <div className="articleContent2">
                                                    <Link to={`/editNewsItem/${item.id}`}>
                                                            Edit
                                                    </Link>
                                                </div>   
                                            </li>
                                        </ul>

                                    </div>


                                                <div className="article-image">
                                                {
                                                        item.UseFeedImage ? (
                                                            <img
                                                    className=""
                                                    src={item.NewsImage} />
                                                        ) :(
                                                            <img
                                                    className=""
                                                    src={item.Images} /> 
                                                        )
                                                    }
                                                </div>
                                                <div className="article-section">
                                                    
                                                    <h4 className="article-title">
                                                      
                                                        {item.Title.length < 30 ? 
                                                      `${item.Title}` : `${item.Title.substring(0,50)}...` }
                                                    </h4>
                                                    <hr/>

                                                    <div>
                                                    {
                                                        item.isOffline ? (
                                                            <>
                                                         <p className="article-source">
                                                                {item.Source} <sup >offline</sup>
                                                            </p>
                                                            </>
                                                        ) : (
                                                            <p className="article-source">
                                                                {item.Source}
                                                            </p>
                                                        )
                                                    }
                                                    
                                                    </div>
                                                    

                                                    <p className="article-text">
                                                  
                                                    {item.Publish.length < 160 ? 
                                                      `${item.Publish}` : `${item.Publish.substring(0,160)}...` }
                                                    </p>
                                                    
                                                </div>

                                             

                                                <div className="">
                                                    <ul className="articleButton-container">
                                                        <li className="articleButton-container-list">
                                                        <p className="articleButton-text">
                                                        {item.DateAdded}
                                                        </p>
                                                        </li>



                                                        <li className="articleButton-container-list">
                                                        {
                                                            item.selected ? (
                                                                <button
                                                                onClick={()=>{this.Deselect_News(item.id)}} 
                                                            className="articleButton-deselect">
                                                                Deselect
                                                            </button>
                                                            ) : (
                                                                <button
                                                                onClick={()=>{this.Select_News(item.id)}}
                                                                className="articleButton-select">
                                                                    Select
                                                                </button> 
                                                            )
                                                        }
                                                        </li>
                                                    </ul>
                                                </div>


                                                
                                            </div>
                                        </li>
                                            </>
                                         ))
                                    }   
                                    </ul>
                        </div>
                                        </>
                                    )
                                }

                        </div>
                    </div>
                                

                                

            </div> 
                            </div>
                            </>
                        ) : (
                            <>
                    <div className="fitter">
                                <div className="content-empty-container">
                                    <div className="content-empty-box">
                                        <h3 className="content-empty-header">
                                      
                                        </h3>

                                        <p className="content-empty-title">
                                          
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </>
                        )
                    }


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
    
)(NewsUpdate) 
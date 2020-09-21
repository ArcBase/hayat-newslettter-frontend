import React , {  Component }from 'react';
import {Input, Select , Form, Button , notification , Switch, message} from 'antd';

import { MessageOutlined, LikeOutlined, 
        StarOutlined, LoadingOutlined , DownloadOutlined } from '@ant-design/icons'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom';
import SideDash from '../../containers/sideNav';
import { connect } from "react-redux";

//import select_news_list from '../containers/summary_card'


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
const previewUrl = host + `/api/preview-mass-mail/`
class Summary_Mail extends Component{
    state= {
        selected_news : [],
        loading : true ,
        error: false, 
    }

    selected_news = async()=>{
       
        await axios.get(host + `/api/summary/`)
        .then(res =>{
            this.setState({
                selected_news:res.data ,
                loading : false,
            })
            console.log(this.state.selected_news)
        })
    }

    sendMail = async()=>{
        message.success('4rd')
        await axios.get(host + `/api/send_news/`)
        .then(res =>{
            if (res.status == 200){
                openNotification(res.data['Message'])
            } else{
                message.error('Error Sending News')
            }
        })
    }

    propmptDeselect = async(news_id) =>{
        await axios.get(host + `/api/deselect_news/${news_id}`)
        .then(res =>{
          openNotification(res.data['Message'])
        })
      }

      Select_News = async(news_id)=>{
        await axios.get(host + `/api/select_news/${news_id}`)
        .then(res =>{
            if (res.status == 200){
                openNotification(res.data['Message'])
            }else{
                message.error('Selection Failed')
            }
        })
    }

    Deselect_News = async(news_id) =>{
        await axios.get(host + `/api/deselect_news/${news_id}`)
        .then(res =>{
            if (res.status == 200){
                this.selected_news()
            }else{
                message.error('Error Deselecting News')
            }
        })
    }


    componentDidMount(){
        this.selected_news()
    }

   

    
    render(){
        const {selected_news} = this.state;
        return(
            
            <>

        


           <div className="wrapper">
                <SideDash />

                <div className="main">
                                        
                
                <div className="fitter">
            <nav class="actionButton-container">
                <ul className="actionButton-container">
                    
                    <li className="actionButton-container-list">
                        <a 
                      target="__blank"
                     href={previewUrl}
                              >
                        <button
                        style={{width:300}}
                        className="actionButton-button">
                        Preview
                        </button>
                           </a>

                    </li>
                    <li className="actionButton-container-list">
                        <a 
                      target="__blank"
                    
                              >
                        <button
                        onClick={this.sendMail}
                        style={{width:300}}
                        className="actionButton-button">
                        Send
                        </button>
                           </a>

                    </li>
                </ul>
                </nav>

            </div>
                 

               

            <div className="fitter">


            <>
                                    
                                    <div className="">
                                    <ul className="article-grid">
                                    {
                                        selected_news.map((item)=>(
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
  )(Summary_Mail);
  
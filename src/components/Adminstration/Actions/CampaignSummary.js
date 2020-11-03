import React , {  Component }from 'react';
import {Input, Select , Form, Button , notification } from 'antd';
import { MessageOutlined, LikeOutlined, 
        StarOutlined, LoadingOutlined , DownloadOutlined } from '@ant-design/icons'
import axios from 'axios'
import { connect } from "react-redux";


//Material Ui
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//Material UI ends here

import { Link, withRouter } from 'react-router-dom';
import SideDash from '../../containers/sideNav';

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
const previewEmailUrl = host + `/api/preview-campaign/`

class reviewCamapigns extends Component{
    state= {
        campaignSummary : [],
        loading : true ,
        error: false, 
    }

    SelectedNews = async()=>{
        await axios.get(host + `/api/campaign-summary/`)
        .then(res =>{
            this.setState({
                campaignSummary:res.data ,
                loading : false,
            })
            console.log(this.state.selected_news)
        })
    }

    

    propmptDeselect = async(news_id) =>{
        const endpoint = host + `/api/deselect-campaign/${news_id}`
        await axios.get(endpoint)
        .then(res =>{
          openNotification(res.data['Message'])
        })
      }

      sendCampaignMail = async()=>{
        await axios.get(host + `/api/send-CampaignMail/`)
        .then(res =>{
            openNotification(res.data['Message'])
        })
    }

    componentDidMount(){
        this.SelectedNews()
    }

   

    
    render(){
        const {campaignSummary} = this.state;
        return(
            
            <>

                    <div className="wrapper">
                        <SideDash />

                        <div className="main">
                                         
                        <div className="fitter">
            <nav class="updateButton-container">
                <ul>
                    <li>
                    <button
                style={{width:300}}
                onClick ={this.sendCampaignMail}
                className="updateContent-button">
                Send Offline News
                </button>
                    </li>
                    
                    <li>
                   <a
                   target="__blank"
                   href={previewEmailUrl}>
                   <button
                style={{width:300}}
               
                className="updateContent-button">
               Preview
                </button>
                   </a>
                    </li>

                    
                </ul>
                </nav>

            </div>
                                
                    <div className="fitter">
                        <div className="page-grid">

                        <div className="left">
                        <div className="article-grid">
                                            <ul className="">
                                            {
                                                campaignSummary.map((item)=>(
                                                    <>
                                                        <li>
                                                    <div className="article-container">
                                                        <div className="article-image">
                                                            <img src={item.Images} />
                                                        </div>
                                                        <div className="article-section">
                                                            <h4 className="article-title">
                                                                {item.Title}
                                                            </h4>
                                                            <p className="article-text">
                                                            {item.Content}
                                                            </p>
                                                            
                                                        </div>
                                                        <div className="article-action">
                                                            <a
                                                            onClick= {()=>{this.propmptDeselect(item.id)}}
                                                            className="left select-article">
                                                            Deselect 
                                                            </a>
                                 
                                                            <a
                                                            href={item.Link} target="__blank"
                                                            className="right open-article">
                                                                View
                                                            </a>
                                                        </div>
                                                    </div>
                                                </li>
                                                     </>
                                                ))
                                            }   
                                        </ul>
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
  )(reviewCamapigns);
  
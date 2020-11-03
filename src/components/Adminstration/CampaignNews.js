import React , { useState, Component }from 'react';
import { notification,  } from 'antd';
import { DoubleRightOutlined} from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import SideDash from '../containers/sideNav'
import CampaignListTable from './Tables/CampaignTableList'

const openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  } 
 


const host='https://hayatnews-backend.herokuapp.com'

class CampaignList extends Component{
    state = {
        loading: false,
        newsArticles: [],
    newsArticlesLength: []
    }

    getOfflineNews = async()=>{
        const endpoint = host + `/api/campaign-newsList/`
        await axios.get(endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    newsArticles:res.data,
                    newsArticlesLength : res.data.length
                })
                console.log('Camapiagns',res.data)
            }else{

            }
        })
    
    } 

    SelectCampaign = async(news_id)=>{
        const endpoint = host + `/api/select-campaign/${news_id}`
        await axios.get(endpoint)
        .then(res =>{
            openNotification(res.data['Message'])
        })
    }

    DeselectCampaign = async(news_id) =>{
        const endpoint = host + `/api/deselect-campaign/${news_id}`
        await axios.get(endpoint)
        .then(res =>{
            openNotification(res.data['Message'])
        })
    }


    componentDidMount(){
        this.getOfflineNews()
    }

    
    render(){
        const {isAuth} = this.props
        if (isAuth == true){

        }else{
            this.props.history.push('/login')
        }
        const {newsArticles, newsArticlesLength} = this.state
        return(
            <>

            <div className="wrapper">
                <SideDash/>

                <div className="main">
                    
            
                <div className="fitter">
            <nav class="actionButton-container">
                <ul className="actionButton-container">
                    <li className="actionButton-container-list">
                    

                     <Link to="/creatOfflineNews">
                     <button
                        onClick={this.UpdateContents}
                        className="actionButton-button">
                        Add Offline News
                     </button>
                    </Link>

                    </li>
                    <li className="actionButton-container-list">
                    
                        <Link to="/creatOnlineNews">
                        <button
                            style={{width:300}}
                                onClick={this.updateRates}
                                className="actionButton-button">
                                Add Online News
                                </button>
                            </Link>

                    </li>



                </ul>
                </nav>

            </div>
                 

           
               

                <div className="fitter">
                            <div className="page-grid">
                    
    
                    <div className="">
                    <div className="">
                                    <ul className="article-grid">
                                    {
                                        newsArticles.map((item)=>(
                                            <>
                                                <li className="article-grid-list">
                                            <div className="article-container">
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
                                                <a
                                                href={item.Link} target="__blank"
                                                className="article-category">
                                                  Category :  {item.Category}
                                                    </a>
                                                    <hr/>
                                                    <h4 className="article-title">
                                                        {item.Title}
                                                    </h4>
                                                    <hr/>
                                                    

                                                    <p className="article-text">
                                                    {item.Content}
                                                    </p>
                                                    
                                                </div>

                                             

                                                <div className="">
                                                    <ul className="articleButton-container">
                                                        <li className="articleButton-container-list">
                                                        <Link to={`/editNewsItem/${item.id}`}>
                                                            <button className="articleButton-edit ">
                                                                Edit 
                                                            </button>
                                                         </Link>
                                                        </li>



                                                        <li className="articleButton-container-list">
                                                        {
                                                            item.selected ? (
                                                                <button
                                                                onClick={()=>{this.DeselectCampaign(item.id)}} 
                                                            className="articleButton-deselect">
                                                                Deselect
                                                            </button>
                                                            ) : (
                                                                <button
                                                                onClick={()=>{this.SelectCampaign(item.id)}}
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
    
)(CampaignList) 
import React , { useState, Component }from 'react';
import { notification,message, Switch} from 'antd';
import { DoubleRightOutlined} from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import SideDash from '../containers/sideNav'
import DashbaordTable from './Tables/Table'

const host='https://backend-hayat.herokuapp.com'
const openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  } 

// const HeritageKeywords = ['Seplat' , 'Business' ,'Economy', 'Central Bank of Nigeria' , 'Power' ,'Marginal Oil Field' , 'OML', 
//        ,'Alteo' ,'Amni', 'Exxon Mobi' ,'Policy' ,'African Oil' ,'Exploration' , 'Politics' ,'Niger Delta', 
//         'Nimasa' ,'Fedral Goverment of Nigeria' ,' Oil Vessels' ,'NUPENG' ,'Host Communities' , 'Shut Down' ,'International Oil Company',
//         'National Oil Companies' , 
//         ]

const HeritageKeywords = [
    'Business Nigeria' ,'Heritage Bank Nigeria', 'Economy Nigeria', 'Central Bank of Nigeria' , 'Power Nigeria' , 
    'First Bank of Nigeria' , 'loan' ,'debt' ,
    'Capital' ,'Devaluaiton','Naira' ,'Foreign Exchange Nigeria','Forex Nigeria', 'Domiciliary Accounts Nigeria' ,
    'Finacial Expert' ,'Withdrawal Nigeria' ,'Deposit Nigeria' ,'Bank Customers Nigeria' ,'Money' ,'CBN'
]
 
// Banking and Stories
const Banking = 'Banking'
const BankingKeywords = [
   'Heritage Bank Nigeria' , 'Banking', 'Domiciliary Accounts Nigeria', 
     'Central Bank of Nigeria' ,'Banking Nigeria' ,'Ifie Sekibo' , 'Bank Customers Nigeria' ,
]



// Business Financials
const BusinessAndFinanacials = 'Business Nigeria'
const BusinessAndFinanacialsKeyword = [
    'Industry Nigeria' ,'Insurance Nigeria' ,'Stock Market' ,'Regulators Nigeria' ,
    ,'Foreign Exchange Nigeria' ,'Stock Market Nigeria' , 'Naira Devaluaiton'
]
 
// Econmy Keywords
const Economy = 'Economy'
const EconomyKeywords = [
    'Real Estate Nigeria' ,'Agriculture Nigeria' ,'Mininng Nigeria' ,'Oil and Gas Nigeria' ,
]

//Politics and General News

const Politics = 'Politics Nigeria'
const PoliticsKeyword = [
    'Buhari Nigeria','General News Nigeria', 'Politics Nigeria',
];

//General News Nigeira
const General = 'Nigeria'
const GeneralNewsKeywords = [
    'Nigeria'
]



class adminDashboard extends Component{

    state = {
        category : [] ,
        stocks :[],
        commodity:[],
        latestArticles : [],
        latestNews : [],
        selectedNews : [] ,

        CC:[],
        BCC:[] ,

        loading: true ,


        news : [],
        category: [],
        filteredNews :[] ,
        loaded_results :false,
        loading: true,
    }


     //Gets The Categories
    newsList = async()=>{
        await  axios.get(host + `/api/top_news/`)
        .then(res =>{
            this.setState({
           latestArticles : res.data ,
            loading: false ,
            })
            console.log(res.data)
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
    
    Stocks_Data = async() =>{
        await axios.get(host + `/api/scrape`)
        await  axios.get(host + `/api/stocks_data/`)
        .then(res =>{
            this.setState({
            stocks : res.data ,
            loading: false ,
            })
            console.log(res.data)

        })
    }
    
    Commodity_Data = async() =>{
       
        await  axios.get(host + `/api/commodity_data/`)
        .then(res =>{
            this.setState({
            commodity : res.data ,
            loading: false ,
            })
            console.log(res.data)

        })
    }

    //this Function Updates and Gets latest news from the internet
    UpdateContents = async()=>{

        for ( let i = 0 ; i<HeritageKeywords.length ; i++){
            const newsEndpoint = host + `/api/get_latest_News/${HeritageKeywords[i]}`
            await axios.get(newsEndpoint)
           .then(res=>{
                if (res.status == 200){
                    this.setState({
                        latestNews : res.data,
                        loading: false ,
                        })
                        message.success(`Fetched ${HeritageKeywords[i]} News Successfully`)
                        console.log('news', res.data)
                    
                } else{
                    message.error('Network Error')
                }
           })

        }
        //const stocksEndpoint = host + `/core/scrapeStocks`
       
        
        //Gets Stock Prices also
        await  axios.get(host + `/api/commodity_data/`)
        await  axios.get(host + `/api/stocks_data/`)

        //Recall the News List to update State
    }

    //Updates Latest Exchange Rates
    updateRates = async()=>{
        const endpoint = host + '/api/exchange-rates/'
        await axios.get(endpoint)
        .then(res=>{
           if (res.status == 200){
            message.success('Rates updated successfully')
           }
           else if(res.status == 500){
               message.error('Network Error, Please Check Your Connection')
           }
           else{
               message.error('Error Updating Rates')
           }
        })
    }

    //Gets and Count Recipients
    getRecipeints = async()=>{

        await axios.get(host + `/api/carbon_copy_mails/`)
            .then(res =>{
                this.setState({
                    CC:res.data
                })
            })

        await axios.get(host + `/api/blind_carbon_copy_mails/`)
        .then(res =>{
            this.setState({
                BCC:res.data
            })
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

    ///gets all the news downloaded

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

    ///Gets selected News
    
    selectedNewsCount = () =>{
        axios.get(host + `/api/summary/`)
        .then(res =>{
            this.setState({
            selectedNews : res.data.length ,
            loading: false ,
            })
            console.log(res.data)

            
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
                this.NewsList()
            }else{
                
            }
        })
    }

    Deselect_News = async(news_id) =>{
        await axios.get(host + `/api/deselect_news/${news_id}`)
        .then(res =>{
            if (res.status == 200){
                this.NewsList()
            }else{

            }
        })
    }


    //API Calls for latest News
fetchLatestNews = async()=>{
    const endpoint = host + `/api/get_latest_News/`
    await axios.get(endpoint)             
    .then(res=>{
        if(res.status == 200){
            message.success('News Fetched Successfully')
        }else{

        }
    })

}
  

    componentDidMount(){

        //Latest News
       

       // this.Category_List();
        this.Commodity_Data();
        this.Stocks_Data();
      //  this.newsList()
        this.getRecipeints()


        this.NewsList()
        this.selectedNewsCount()
        this.Category_List() 
    };

    render(){
        const {   stocks , commodity , latestNews ,latestArticles , BCC , CC} = this.state
        const {news , category,filteredNews, loading, loadedResults ,selectedNews} = this.state
        let newArticles = news.slice(0,3)
        const {isAuth} = this.props
       

        if (isAuth === false){
            
            this.props.history.push('/login')
          }else{
            let AllowAdmin  = true
          }
        return(
            <>
           <div className="wrapper">
                            <SideDash/>

                    <div className="main">
                        
                        <div className="fitter">
                        <div className="">
                        <ul className="infograph-card" >
                                <li className="infograph-cards-list bgBlue">
                                    <div className="">
                                        <div className="">
                                            <h3 className="header">
                                                News 
                                            </h3>
                                        </div>
                                        
                                        <div className="subHeader">
                                            <p>
                                                {news.length}
                                            </p>
                                        </div>

                                    </div>
                                </li> 

                                <li  className="infograph-cards-list" >
                                    <div className="">
                                            <div className="Header">
                                                <h3 className="header">
                                                    Selected News
                                                </h3>
                                            </div>
                                            
                                            <div className="subHeader">
                                                <p>
                                                    {selectedNews}
                                                </p>
                                            </div>

                                        </div>
                                </li>

                                <li  className="infograph-cards-list" >
                                    <div className="">
                                            <div className="Header">
                                                <h3 className="header">
                                                    Reciepints
                                                </h3>
                                            </div>
                                            
                                            <div className="subHeader">
                                                <p>
                                                    {CC.length}
                                                </p>
                                            </div>

                                        </div>
                                </li>
                              
                               
                            </ul>
                        </div>

                        </div>      

                    <div className="fitter">
            <nav class="actionButton-container">
                <ul className="actionButton-container">
                    <li className="actionButton-container-list">
                    <button
                        onClick={this.fetchLatestNews}
                        className="actionButton-button">
                         Update News
                     </button>
                    </li>
                    <li className="actionButton-container-list">
                    <button
                    style={{width:300}}
                        onClick={this.updateRates}
                        className="actionButton-button">
                        Update Exchange Rates
                        </button>
                    </li>
                </ul>
                </nav>

            </div>
                 

                    <div className="fitter">
                            <div className="page-grid">
                    
    
                    <div className="left">
                        <div className="">
                        {
                                    !loadedResults ? (
                            <>
                                    
                                    <div className="">
                                    <ul className="article-grid">
                                    {
                                        newArticles.map((item)=>(
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
                                    ) : (
                                   
                                        <p></p>

                                    )
                                }

                        </div>
                    </div>
                                

                                </div> 
                </div>


                    <div className="fitter">
                        <div className="single-grid">
                            <DashbaordTable data={commodity} />
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
    
)(adminDashboard) 
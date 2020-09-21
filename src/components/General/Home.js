import React , { useState, Component }from 'react';
import { notification,  } from 'antd';
import { DoubleRightOutlined} from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';



const host='https://backend-hayat.herokuapp.com'
class HomePage extends Component{
    state= {
        category : [] ,
        stocks :[],
        commodity:[],
        loading: true ,
    }

    //Gets The Categories
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
    

    componentDidMount(){
        this.Category_List();
        this.Commodity_Data();
        this.Stocks_Data();
    };

    render(){
        const {category ,loading , stocks , commodity} = this.state
        const a = this.state.stocks
        
          return(
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


                <div className="container">
                    <div className="grid grid-cols-8 gap-4">
                        {
                            category.map((c)=>(
                                <div className=" col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                            <div className="category-box">
                                <div className="category-box-container">
                                
                                        <h3 className ="category-box-heading">
                                            {c.Name}
                                        </h3>
                                        <p className="category-box-text">
                                            Get the latest news on {c.Name}
                                        </p>
                                        <p className="category-box-link">
                                        <Link to={`/selected_news/${c.id}`}>
                                      Open  <DoubleRightOutlined />
                                        </Link>
                                        </p>
                                </div>
                            </div>
                        </div>
                            ))
                        }
                    </div>
                </div>

                <div className="container mx-auto my-auto">
            <div className="grid grid-cols-6">
            
                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                        <div className="">
                            <h3>
                            Seplat Stocks Data 
                            </h3>
                        </div>

                          <div className="base-card">

                            <table>
                                    <tr>
                                    <th>Asset</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Day</th>
                                    <th>Yearly</th>
                                    </tr>  

                                     
                                    
                                    {
                                        stocks.map((s)=>(
                                            <>
                                            <tr>
                                            <td> 
                                    {s.asset}
                                    </td>
                                    <td> 
                                    {s.Date}
                                    </td>
                                    <td> 
                                    {s.Price}
                                    </td>
                                    <td> 
                                    {s.Day}
                                    </td>
                                    <td> 
                                    {s.Yearly}
                                    </td>
                                    </tr>  
                                    </>
                                        ))
                                    }
                                    
                                                             
                                </table>
                                     </div>
                                </div>
                          </div>
                        </div>

                        <div className="container mx-auto my-auto">
            <div className="grid grid-cols-6">
            
                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                        <div className="">
                            <h3>
                            Commodities
                            </h3>
                        </div>

                          <div className="base-card">

                            <table>
                                    <tr>
                                    <th>Asset</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Increment</th>
                                    <th>Day</th>
                                    <th>Weekly</th>
                                    <th>Monthly</th>
                                    <th>Yearly</th>
                                    </tr>  

                                     
                                    
                                    {
                                        commodity.map((s)=>(
                                            <>
                                            <tr>
                                            <td> 
                                    {s.asset}
                                    </td>
                                    <td> 
                                    {s.Date}
                                    </td>
                                    <td> 
                                    {s.Price}
                                    </td>
                                    <td> 
                                    {s.Increment}
                                    </td>
                                    <td> 
                                    {s.Day}
                                    </td>
                                    <td> 
                                    {s.Weekly}
                                    </td>
                                    <td> 
                                    {s.Monthly}
                                    </td>
                                    <td> 
                                    {s.Yearly}
                                    </td>
                                    </tr> 
                                    </>
                                        ))
                                    }
                                    
                                                               
                                </table>
                                     </div>
                                </div>
                          </div>
                        </div>


            </>
        )
    }
}

export default HomePage
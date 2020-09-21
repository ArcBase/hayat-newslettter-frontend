import React ,{useState, Component} from 'react';

import {notification} from 'antd';
import axios from 'axios';

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

class select_news_list extends React.Component{
  
   promptSelect = async(news_id)=>{
      await axios.get(host + `/api/select_news/${news_id}`)
      .then(res =>{
        openNotification(res.data['Message'])
      })
  }

   propmptDeselect = async(news_id) =>{
    await axios.get(host + `/api/deselect_news/${news_id}`)
    .then(res =>{
      openNotification(res.data['Message'])
    })
  }

  //Passed Props
   id = this.props.id
   Title = this.props.Title
   Content = this.props.Content
   Images = this.props.Images
   Keyword = this.props.Keyword
   Link = this.props.Link
   Selected = this.props.Selected
   Publish = this.props.Publish


  render(){
    const id = this.props.id
    const Title = this.props.Title
    const Content = this.props.Content
    const Images = this.props.Images
    const Keyword = this.props.Keyword
    const Link = this.props.Link
    const Selected = this.props.Selected
    const Publish = this.props.Publish
    
    return (
        
        <div className="col-span-3 sm:col-span-3\
        md:col-span-3 lg:col-span-2 xl:col-span:2  py-2">

            <div className="">
                <ul>
                    <li>
                        weva
                    </li>
                </ul>
            </div>

        </div>
    )
  }


}

export default select_news_list
import React , { useState, Component }from 'react';
import {Input, Select , Form, Button , notification } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined  } from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';

import News_Card_List from '../containers/News_Card'

import filtered_news_card from '../containers/filtered_news_Card'
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


class Results extends Component{
   
    filtered_news  = this.props

    render(){
        return(
            <>

            </>
        )
    }
}
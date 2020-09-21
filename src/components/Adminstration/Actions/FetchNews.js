import React , { useState, Component }from 'react';
import { notification,  } from 'antd';
import axios from 'axios'


const HeritageKeyWords = ['Business' ,'Banking' , 'Heritage Bank' ,'First Bank' , 'GTB' ,'Access Bank' , 'Loan' , 'Finance' ,
            'Capital' ,'Economy' ,'Goverment' ,'Policy' ,'Money', 'Central Bank of Nigeria' , 'Naira Devaluation' ,
            'Foriegn Exchange' , 'Forex' , 'Financial Expert' , 'Withdrawal' ,'Deposits' ,'Bank Customers'      
]

const SeplaKeywords = ['Seplat' , 'Business' ,'Economy', 'Central Bank of Nigeria' , 'Power' ,'Marginal Oil Field' , 'OML', 
    'Seplat' ,'Alteo' ,'Amni', 'Exxon Mobi' ,'Policy' ,'African Oil' ,'Exploration' , 'Politics' ,'Niger Delta', 
    'Nimasa' ,'Fedral Goverment of Nigeria' ,' Oil Vessels' ,'NUPENG' ,'Host Communities' , 'Shut Down' ,'Internation Oil Company',
    'Nation Oil Companies' , 
    ]

const host='https://backend-hayat.herokuapp.com' 
const getNews = async(item)=>{
    const endpoint =  host + `${item}`
    await axios.get(endpoint)
    .then(
        console.log('News')
    )
}

export default  newsCrawler =()=>{
    for ( i = 0 ; i<KeyWords.length ; i++){
        getNews(SeplaKeywords)
    }
}
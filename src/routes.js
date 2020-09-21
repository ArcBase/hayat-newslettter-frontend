import React from "react";
import { Route } from "react-router";
import Hoc from "./hoc/hoc";


import LoginForm from "./components/authentication/login";
import RegistrationForm from "./components/authentication/register";

import HomePage from './components/General/Home'
import News_Category_Selected from './components/General/Categorized_News'

import News_List from './components/News/list'
import EditMailItem from './components/Adminstration/Actions/EditMassMail'
import Summary_Mail from './components/Adminstration/Actions/Summary'
import Admin_Control from './components/Adminstration/RecipeintControl'
import NewsUpdate from './components/Adminstration/News'


import adminDashboard from './components/Adminstration/Dashboard'
import CampaignList from './components/Adminstration/CampaignNews'
import reviewCamapigns from './components/Adminstration/Actions/CampaignSummary'
import CampaignCreate from './components/Adminstration/Actions/CreateNews'

import CampaignCreateOnline from './components/Adminstration/Actions/CreateOnlineNews'
const GeneralRouter = () =>(

   <Hoc>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/register" component={RegistrationForm} />      

      <Route exact path="/" component={adminDashboard} /> {" "}
      <Route exact path="/dashboard/" component={adminDashboard} /> {" "}
      <Route exact path="/NewsLink/" component={NewsUpdate} /> {" "}
      
      <Route exact path="/editNewsItem/:NewsID/" component={EditMailItem} /> {" "}

      <Route exact path="/campaignList/" component={CampaignList} /> {" "}
      <Route exact path="/proceedCampaign/" component={reviewCamapigns} /> {" "}
      <Route exact path="/creatOfflineNews/" component={CampaignCreate} /> {" "}
      
      <Route exact path="/creatOnlineNews/" component={CampaignCreateOnline} /> {" "}
      

      <Route exact path="/tetshome" component={HomePage} /> {" "}
      <Route exact path="/selected_news/:CategoryID/" component={News_Category_Selected} /> {" "}
      <Route exact path="/news" component={News_List} /> {" "}
      <Route exact path="/proceed/" component={Summary_Mail} /> {" "}
      
      <Route exact path="/recipients/" component={Admin_Control} /> {" "}
   </Hoc>
   
)

export default GeneralRouter 
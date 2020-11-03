import React from 'react';
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

//import {mdiSelectInverse } from '@material-ui/icons'

import {notification} from 'antd';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const host='https://hayatnews-backend.herokuapp.com'

const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const  News_Card_List =(props)=> {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const promptSelect = async(news_id)=>{
      await axios.get(host + `/api/select_news/${news_id}`)
      .then(res =>{
        openNotification(res.data['Message'])
      })
  }

  const propmptDeselect = async(news_id) =>{
      await axios.get(host + `/api/deselect_news/${news_id}`)
      .then(res =>{
        openNotification(res.data['Message'])
      })
  }
  //Passed Props
  const id = props.id
  const Title = props.Title
  const Content = props.Content
  const Images = props.Images
  const Keyword = props.Keyword
  const Link = props.Link
  const Selected = props.Selected
  const Publish = props.Publish


  return (

            

          <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      S
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={Title}
                  subheader={Publish}
                />
                <CardMedia
                  className={classes.media}
                  image={Images}
                  title=""
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {Content}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  {
                    !Selected ?(
                    
                      <IconButton 
                  onClick= {()=>{promptSelect(id)}}
                  aria-label="Select">
                    <FavoriteIcon style={{color:'blue'}} />
                  </IconButton>
                    ):(
                      <IconButton 
                  onClick= {()=>{propmptDeselect(id)}}
                  aria-label="Select">
                    <FavoriteIcon  style={{color:'red'}}  />
                  </IconButton>
                    )
                  }
                  <IconButton aria-label="share">
                    <a target="_blank" href={Link}>
                    <ShareIcon  />
                    </a>
                  </IconButton>
                
                </CardActions>
              
              </Card>


  );
}

export default News_Card_List
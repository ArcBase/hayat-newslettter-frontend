import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import {MenuItem, MenuList} from '@material-ui/core'


const host='https://hayatnews-backend.herokuapp.com'

export default class SideDash extends React.Component{
    

    render(){
     
      return(
        <>
           <div class="sidenav">
                
                

                <MenuList>
              <div  className = "menu-link">
              <MenuItem 
            className="menu-link-text"
            component={Link} to="/Dashboard/" >
            Dashboard
            </MenuItem>
              </div>


          
              <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/NewsLink/" >
            News
            </MenuItem>
          </div>

        
          <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/Proceed/" >
            Preview
            </MenuItem>
          </div>

             

            <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/campaignList" >
            Add News
            </MenuItem>
          </div>
        
          <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/recipients" >
            Recipents
            </MenuItem>
          </div>


          </MenuList>
         
            
        </div>
        </>
      )
    }


}


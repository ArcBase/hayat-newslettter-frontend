import React , { useState, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


const CustomLayout =(props,)=>{
     return(
         <>

        <ul className="navblock">
        <li className="navlist">
            <Link to="/">
                   Home
                    </Link>
            </li>

            <li className="navlist">
            <Link to="/news/">
                   News
                    </Link>
            </li>

            <li className="navlist">
            <Link to="/proceed/">
                   Summary
                    </Link>
            </li>

            <li className="navlist">
            <Link to="/dashboard/">
                   Dashboard
             </Link>
            </li>


        </ul>
        <div>
            {props.children}
        </div>
         </>
     )
}

export default CustomLayout
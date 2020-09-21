import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import { connect } from "react-redux"; 
import {InputNumber  ,notification,  } from 'antd';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const  openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    }

var host = ''


 

export default function CampaignListTable(props) {
  const classes = useStyles();
  const  token = props.token
  let indexNumber = 1
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Campaign Type</TableCell>

          <TableCell align="left">Asset</TableCell>
            
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Increment</TableCell>
            <TableCell align="left">Day</TableCell>
            <TableCell align="left">Weekly</TableCell>
            <TableCell align="left">Monthly</TableCell>
            <TableCell align="left">Yearly</TableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
                <TableCell >{indexNumber++}</TableCell>
            <TableCell >{row.Date}</TableCell>
            <TableCell >{row.asset}</TableCell>
            <TableCell >{row.Price}</TableCell>
            <TableCell >{row.Increment}</TableCell>
            <TableCell >{row.Day}</TableCell>
            <TableCell >{row.Monthly}</TableCell>
            <TableCell >{row.Weekly}</TableCell>
            <TableCell >{row.Yearly}</TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



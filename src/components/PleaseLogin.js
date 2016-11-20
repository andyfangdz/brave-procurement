/**
 * Created by andy on 11/19/16.
 */
import React, {Component} from 'react';
import MaxWidthPaper from './common/MaxWidthPaper';
import RaisedButton from 'material-ui/RaisedButton';
import {login} from '../firebase';
export default () => <MaxWidthPaper>
  <div style={{height: "480px", textAlign: "center"}}>
    <div style={{top: "200px", position: "relative"}}>
      <h2>Please login using your EVE Account.</h2>
      <RaisedButton label="Login With EVE Online" onTouchTap={login} style={{marginLeft: "20px", marginRight: "20px"}}/>
    </div>
  </div>
</MaxWidthPaper>

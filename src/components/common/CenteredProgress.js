/**
 * Created by andy on 11/18/16.
 */
import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default (props) => {
  return (
    <div style={{height: "480px", textAlign: "center"}}>
      <CircularProgress
        size={80} thickness={5}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "200px",
          display: "block",
          top: "200px"
        }}
      />
      <h2>{props.title}</h2>
    </div>
  );
}
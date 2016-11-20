/**
 * Created by andy on 11/18/16.
 */
import Paper from 'material-ui/Paper';
import React, {Component} from 'react';

let MaxWidthPaper = (props) => {
  return (
    <Paper style={{
      maxWidth: props.maxWidth || 960,
      minHeight: 200,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20px",
      marginBottom: "20px"
    }}>
      {props.children}
    </Paper>
  );
};

export default MaxWidthPaper;
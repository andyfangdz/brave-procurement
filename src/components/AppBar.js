/**
 * Created by andy on 11/18/16.
 */
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
export default class BPAppBar extends Component {
  render() {
    return (
      <AppBar
        title="Brave Procurement"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        style={{position: "fixed", top: "0"}}
      />
    )
  }
}
/**
 * Created by andy on 11/18/16.
 */
import React, {Component} from 'react';
import base from '../firebase';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import CenteredProgress from './common/CenteredProgress';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
    }
  }

  componentWillMount() {
    this.ref = base.syncState('items', {
      context: this,
      state: 'items',
      asArray: true
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  render() {
    if (this.state.items) {
      return <div>
        <Toolbar>
          <ToolbarGroup firstChild={true}>

          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Actions" />
            <FontIcon className="muidocs-icon-custom-sort" />
            <ToolbarSeparator />
            <RaisedButton label="Create Fulfillment" primary={true} />
            <IconMenu
              iconButtonElement={
                <IconButton touch={true}>
                  <NavigationExpandMoreIcon />
                </IconButton>
              }
            >
              <MenuItem primaryText="Download" />
              <MenuItem primaryText="More Info" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <Table multiSelectable={true}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Fade Volume</TableHeaderColumn>
              <TableHeaderColumn>Days Left</TableHeaderColumn>
              <TableHeaderColumn>Fade Sell</TableHeaderColumn>
              <TableHeaderColumn>Jita Sell</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.items.map((item) =>
                <TableRow key={item.id}>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{item.dailyVolume}</TableRowColumn>
                  <TableRowColumn>{item.daysLeft}</TableRowColumn>
                  <TableRowColumn>{item.marketSellPrice}</TableRowColumn>
                  <TableRowColumn>{item.hubSellPrice}</TableRowColumn>
                </TableRow>
              )
            }

          </TableBody>
        </Table>
      </div>;
    } else {
      return <CenteredProgress />;
    }
    ;
  }
}
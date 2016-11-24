/**
 * Created by andy on 11/18/16.
 */
import React, {Component} from 'react';
import base from '../firebase';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
window.$ = $;
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import CenteredProgress from './common/CenteredProgress';
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
        <BootstrapTable data={this.state.items} options={{
          defaultSortName: 'days_left',
          defaultSortOrder: 'asc'
        }}
                        containerStyle={{whiteSpace: "normal"}}
        >
          <TableHeaderColumn isKey dataField='id' hidden={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 100 } } dataSort={ true }>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='profit_per_m3' dataFormat={numberWithCommas} dataSort={ true }>Profit/m&sup3;</TableHeaderColumn>
          <TableHeaderColumn dataField='days_left' dataSort={ true }>Days Left</TableHeaderColumn>
          <TableHeaderColumn dataField='volume' dataSort={ true }>Volume (m&sup3;)</TableHeaderColumn>
          <TableHeaderColumn dataField='source_price' dataFormat={numberWithCommas} dataSort={ true }>Jita Price</TableHeaderColumn>
          <TableHeaderColumn dataField='source_quantity' dataFormat={numberWithCommas} dataSort={ true }>Jita Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='target_price' dataFormat={numberWithCommas} dataSort={ true }>DO6 Price</TableHeaderColumn>
          <TableHeaderColumn dataField='target_quantity' dataFormat={numberWithCommas} dataSort={ true }>DO6 Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='daily_amount' dataFormat={numberWithCommas} dataSort={ true }>DO6 Daily</TableHeaderColumn>
        </BootstrapTable>,
      </div>;
    } else {
      return <CenteredProgress />;
    }
    ;
  }
}
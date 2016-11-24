import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import Dashboard from './components/Dashboard';
import MaxWidthPaper from './components/common/MaxWidthPaper';
import CenteredProgress from './components/common/CenteredProgress';
import PleaseLogin from './components/PleaseLogin';

import BPAppBar from './components/AppBar';

import base, {auth0} from './firebase';

function removeHash () {
  var scrollV, scrollH, loc = window.location;
  if ("pushState" in history)
    history.pushState("", document.title, loc.pathname + loc.search);
  else {
    // Prevent scrolling by storing the page's current scroll offset
    scrollV = document.body.scrollTop;
    scrollH = document.body.scrollLeft;

    loc.hash = "";

    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scrollV;
    document.body.scrollLeft = scrollH;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {authenticated: false, authenticating: false};
  }
  componentWillMount() {
    let self = this;
    let result = auth0.parseHash(window.location.hash);

    //use result.idToken to call your rest api

    if (result && result.idToken) {
      // optionally fetch user profile
      auth0.getProfile(result.idToken, function (err, profile) {
        if (err) {
          // handle error
          return;
        }

        localStorage.setItem('profile', JSON.stringify(profile));
        self.setState({authenticating: true});

        // Set the options to retreive a firebase delegation token
        var options = {
          id_token : result.idToken,
          api : 'firebase',
          scope : 'openid profile'
        };

        // Make a call to the Auth0 '/delegate'
        auth0.getDelegationToken(options, function(err, result) {
          console.log(result);
          if(!err) {
            // Exchange the delegate token for a Firebase auth token
            base.authWithCustomToken(result.id_token, (a, b) => {
              console.log(a, b);
              self.setState({authenticated: true})
            });
            removeHash();
          }
        });
      });
    }
  }
  render() {
    return (
      <MuiThemeProvider>
        <div className="main-body">
          <BPAppBar />
          <MaxWidthPaper>
            {(() => {
              if (this.state.authenticated) {
                return <Dashboard />;
              }
              if (this.state.authenticating) {
                return <CenteredProgress title="Authenticating..." />;
              }
              return <PleaseLogin />;
            })()}
          </MaxWidthPaper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

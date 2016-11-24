/**
 * Created by andy on 11/18/16.
 */
import Rebase from 're-base';
import Auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

export let auth0 = new Auth0({
  domain: 'andyfang.auth0.com',
  clientID: 'gJ8hjabdEzUM1nHFNTX6K80ehTZJY7Yw',
  responseType: 'token',
  callbackURL: window.location
});

export let base = Rebase.createClass({
  apiKey: "AIzaSyBf6iu7djqYa-fFdmxsmRXEUBpZQgAIzqY",
  authDomain: "brave-procurement.firebaseapp.com",
  databaseURL: "https://brave-procurement.firebaseio.com",
  storageBucket: "brave-procurement.appspot.com",
  messagingSenderId: "222874893332"
}, "brave-procurement");

export function login() {
  var options = {
    auth: {
      params: {
        state: 'foo',
        scope: 'openid profile'
      },
      sso: true
    }
  };
  let lock = new Auth0Lock('gJ8hjabdEzUM1nHFNTX6K80ehTZJY7Yw', 'andyfang.auth0.com', options);

  // Display the default lock widget
  lock.show();
}

export function logout() {
  localStorage.removeItem('profile');
  base.unauth();
}

export default base;

function (accessToken, ctx, cb) {
  function authGet(url, callback) {
    request.get(url, {
      'headers': {
        'Authorization': 'Bearer ' + accessToken,
        'User-Agent': 'Auth0',
        'Host': 'login.eveonline.com'
      }
    }, function (error, response, data) {
      if (error) cb(error);
      if (response.statusCode != 200) cb(new Error(url + '\nStatus code:' + response.statusCode));
      callback(JSON.parse(data));
    })
  }
  authGet('https://login.eveonline.com/oauth/verify', function (eveProfile) {
    cb(null, {
      characterID: eveProfile.CharacterID,
      user_id: eveProfile.CharacterID,
      name: eveProfile.CharacterName
    })
  });
}

function (user, context, cb) {
  var isFirebase = context.isDelegation && context.request.body.api_type === "firebase";
  if (isFirebase) {
    var isBrave = false;
    function rawGet(url, callback) {
      request.get(url, null, function (error, response, data) {
        if (error) cb(error);
        if (response.statusCode != 200) cb(new Error(url + '\nStatus code:' + response.statusCode));
        callback(JSON.parse(data));
      })
    }
    var identity = user.identities[0];
    rawGet('https://crest-tq.eveonline.com/characters/' + user.characterID + '/', function (characterData) {
      rawGet('https://evewho.com/api.php?type=corporation&id=' + characterData.corporation.id, function (corpData) {
        if (corpData.info.alliance_id == 99003214) {
          isBrave = true;
        }
        user.firebase_data = {
          uid: identity.provider + ":" + identity.user_id,
          isBrave: isBrave,
          name: user.name
        };
        return cb(null, user, context);
      })
    });

  } else {
    return cb(null, user, context);
  }

}


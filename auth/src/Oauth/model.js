'use strict'

var _ = require('lodash');
var sqldb = require('../db/sql/models');

// Oauth2 Password Grant
module.exports = {
  getAccessToken: bearerToken => {
    return sqldb.OAuthAccessToken
      .findOne({
        where: {access_token: bearerToken},
        attributes:[['access_token', 'access_token'], ['expires', 'accessTokenExpiresAt'], 'scope', 'user_id'],
        include: [
          {
            model: sqldb.User,
            attributes: ['username'],
            include: [
              {
                model: sqldb.Role,
                attributes: ['rolename'],
                include: [
                  {
                    model: sqldb.Policy
                  }
                ]
              }
            ]
          }
        ]
      })
      .then(accessToken => {
        if ( !accessToken ) return false;
        var token = accessToken.toJSON();
        token.user = token.User;
        return token;
      })
      .catch(err => {
        console.log("getAccessToken - Err: ", err)
      });
  },
  getRefreshToken: refreshToken => {
    if (!refreshToken || refreshToken === 'undefined') return false

    return sqldb.OAuthRefreshToken
      .findOne({
        attributes: ['client_id', 'user_id', 'expires'],
        where: {refresh_token: refreshToken},
        include: [sqldb.OAuthClient, sqldb.User]
      })
      .then(savedRT => {
        var tokenTemp = {
          user: savedRT ? savedRT.User.toJSON() : {},
          client: savedRT ? savedRT.OAuthClient.toJSON() : {},
          refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
          refreshToken: refreshToken,
          refresh_token: refreshToken,
          scope: savedRT.scope
        };
        return tokenTemp;

      }).catch(err => {
        console.log("getRefreshToken - Err: ", err)
      });
  },
  getClient: (clientId, clientSecret) => {
      const options = {
      where: {client_id: clientId},
      attributes: ['client_id', 'scope'],
    };
    if (clientSecret) options.where.client_secret = clientSecret;

    return sqldb.OAuthClient
      .findOne(options)
      .then(client => {
        if (!client) return new Error("client not found");
        var clientWithGrants = client.toJSON()
        clientWithGrants.grants = ['password', 'refresh_token']
        // Todo: need to create another table for redirect URIs
        // clientWithGrants.redirectUris = [clientWithGrants.redirect_uri]
        // delete clientWithGrants.redirect_uri
        //clientWithGrants.refreshTokenLifetime = integer optional
        //clientWithGrants.accessTokenLifetime  = integer optional
        return clientWithGrants
      }).catch(err => {
        console.log("getClient - Err: ", err)
      });
  },
  getUser: (username, password) => {
    return sqldb.User
      .findOne({
        where: {username: username},
        attributes: ['id', 'username', 'scope']
      })
      .then(user => {
        return user.toJSON();
      })
      .catch(err => {
        console.log("getUser - Err: ", err)
      });
  },
  saveToken: (token, client, user) => {
    return Promise.all([
      sqldb.OAuthAccessToken.create({
        access_token: token.accessToken,
        expires: token.accessTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
        scope: token.scope
      }),
      token.refreshToken ? sqldb.OAuthRefreshToken.create({ // no refresh token for client_credentials
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
        scope: token.scope
      }) : [],
    ])
    .then(resultsArray => {
      return _.assign(  // expected to return client and user, but not returning
        {
          client: client,
          user: user,
          access_token: token.accessToken, // proxy
          refresh_token: token.refreshToken, // proxy
        },
        token
      )
    })
    .catch(err => {
      console.log("revokeToken - Err: ", err)
    });
  },
  validateScope: () => {

  },
  revokeAuthorizationCode: code => {
    return sqldb.OAuthAuthorizationCode
      .findOne({
        where: {
          authorization_code: code.code
        }
      })
      .then(rCode => {
        var expiredCode = code
        expiredCode.expiresAt = new Date('2015-05-28T06:59:53.000Z')
        return expiredCode
      }).catch(err => {
        console.log("getUser - Err: ", err)
      });
  },
  revokeToken: token => {
    return sqldb.OAuthRefreshToken
      .findOne({
        where: {
          refresh_token: token.refreshToken
        }
      }).then(rT => {
        if (rT) rT.destroy();
        var expiredToken = token
        expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z')
        return expiredToken
      }).catch(err => {
        console.log("revokeToken - Err: ", err)
      });
  },
  getAuthorizationCode: code => {
    return sqldb.OAuthAuthorizationCode
      .findOne({
        attributes: ['client_id', 'expires', 'user_id', 'scope'],
        where: {authorization_code: code},
        include: [sqldb.User, sqldb.OAuthClient]
      })
      .then(authCodeModel => {
        if (!authCodeModel) return false;
        var client = authCodeModel.OAuthClient.toJSON()
        var user = authCodeModel.User.toJSON()
        return reCode = {
          code: code,
          client: client,
          expiresAt: authCodeModel.expires,
          redirectUri: client.redirect_uri,
          user: user,
          scope: authCodeModel.scope,
        };
      }).catch(err => {
        console.log("getAuthorizationCode - Err: ", err)
      });
  },
  saveAuthorizationCode: (code, client, user) => {
    return sqldb.OAuthAuthorizationCode
      .create({
        expires: code.expiresAt,
        client_id: client.id,
        authorization_code: code.authorizationCode,
        user_id: user.id,
        scope: code.scope
      })
      .then(() => {
        code.code = code.authorizationCode
        return code
      }).catch(err => {
        console.log("saveAuthorizationCode - Err: ", err)
      });
  },
  getUserFromClient: client => {
    var options = {
      where: {client_id: client.client_id},
      include: [sqldb.User],
      attributes: ['id', 'client_id', 'redirect_uri'],
    };
    if (client.client_secret) options.where.client_secret = client.client_secret;

    return sqldb.OAuthClient
      .findOne(options)
      .then(client => {
        if (!client) return false;
        if (!client.User) return false;
        return client.User.toJSON();
      }).catch(err => {
        console.log("getUserFromClient - Err: ", err)
      });
  },
  validateScope: (user, client, scope) => {
    return (user.scope === scope && client.scope === scope && scope !== null) ? scope : false
  },
  verifyScope: (token, scope) => {
    return token.scope === scope
  }
}

'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User',  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: DataTypes.STRING(32),
    password: DataTypes.STRING(32),
    scope: DataTypes.STRING
  }, {
    tableName: 'oauth_users', // oauth_users
    timestamps: false,
    underscored: true,
  });

  // User.associate = function (models) {
  //   //models.User.hasMany(models.OAuthClient);
  // }

  return User;
}

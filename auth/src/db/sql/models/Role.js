'use strict';

module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role',  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    rolename: DataTypes.STRING(32)
  }, {
    tableName: 'o_roles', // o_roles
    timestamps: false,
    underscored: true,
  });

  // User.associate = function (models) {
  //   //models.User.hasMany(models.OAuthClient);
  // }

  return Role;
}

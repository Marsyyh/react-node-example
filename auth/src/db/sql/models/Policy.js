'use strict';

module.exports = (sequelize, DataTypes) => {
  var Policy = sequelize.define('Policy',  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    policyname: DataTypes.STRING(32)
  }, {
    tableName: 'o_policies', // o_roles
    timestamps: false,
    underscored: true,
  });

  // User.associate = function (models) {
  //   //models.User.hasMany(models.OAuthClient);
  // }

  return Policy;
}

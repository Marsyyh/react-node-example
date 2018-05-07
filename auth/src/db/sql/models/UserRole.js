'use strict';


module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'o_user_roles',
    timestamps: false,
    underscored: true,
  });

  UserRole.associate = models => {
    models.UserRole.belongsTo(models.Role, {
      foreignKey: 'role_id',
    });

    models.UserRole.belongsTo(models.User, {
      foreignKey: 'user_id',
    });

    models.Role.belongsToMany(models.User, {
      through: models.UserRole
    });

    models.User.belongsToMany(models.Role, {
      through: models.UserRole
    });
  }

  return UserRole;
};

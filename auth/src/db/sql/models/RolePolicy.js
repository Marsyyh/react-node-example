'use strict';


module.exports = (sequelize, DataTypes) => {
  const RolePolicy = sequelize.define('RolePolicy', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    }
  }, {
    tableName: 'o_role_policies',
    timestamps: false,
    underscored: true,
  });

  RolePolicy.associate = models => {
    models.RolePolicy.belongsTo(models.Role, {
      foreignKey: 'role_id',
    });

    models.RolePolicy.belongsTo(models.Policy, {
      foreignKey: 'policy_id',
    });

    models.Role.belongsToMany(models.Policy, {
      through: models.RolePolicy
    });

    models.Policy.belongsToMany(models.Role, {
      through: models.RolePolicy
    });
  }

  return RolePolicy;
};

import {DataTypes} from "sequelize";

export default (sequelize) => {
  const ClientModel = sequelize.define('ClientModel', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    version: {
      type: DataTypes.INTEGER.UNSIGNED,
      default: 1,
    },
    baseVersion: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    apiKey: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'client',
    timestamps: true,
  });

  ClientModel.associate = (models) => {
    ClientModel.belongsTo(models.UserModel, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
    ClientModel.belongsTo(models.UserModel, {
      foreignKey: 'updatedBy',
      as: 'updater',
    });
    ClientModel.belongsTo(models.UserModel, {
      foreignKey: 'deletedBy',
      as: 'deleter',
    });
  }

  return ClientModel;
}

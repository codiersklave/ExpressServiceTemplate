import {DataTypes} from "sequelize";

export default (sequelize) => {
  const ClientHistoryModel = sequelize.define('ClientHistoryModel', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    version: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    baseVersion: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    apiKey: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
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
    tableName: '_client',
    timestamps: false,
  });

  ClientHistoryModel.associate = (models) => {

  }

  return ClientHistoryModel;
}

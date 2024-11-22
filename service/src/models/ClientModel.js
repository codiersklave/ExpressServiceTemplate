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
    deleted: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    underscored: true,
    tableName: 'client',
    timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated',
  });

  ClientModel.associate = (models) => {

  }

  return ClientModel;
}

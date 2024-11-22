import {DataTypes} from "sequelize";

export default (sequelize) => {
  const UserHistoryModel = sequelize.define('UserHistoryModel', {
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
    email: {
      type: DataTypes.STRING(255),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    created: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
    deleted: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    underscored: true,
    tableName: '_user',
    timestamps: false,
  });

  UserHistoryModel.associate = (models) => {

  }

  return UserHistoryModel;
}

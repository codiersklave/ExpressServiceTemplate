import {DataTypes} from "sequelize";

export default (sequelize) => {
  const PersonHistoryModel = sequelize.define('PersonHistoryModel', {
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
    familyName: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    givenName: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    birthName: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    maternalName: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    honPrefixes: {
      type: DataTypes.STRING(160),
      allowNull: true,
    },
    honSuffixes: {
      type: DataTypes.STRING(160),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
    tableName: '_person',
    timestamps: false,
  });

  PersonHistoryModel.associate = (models) => {

  }

  return PersonHistoryModel;
}

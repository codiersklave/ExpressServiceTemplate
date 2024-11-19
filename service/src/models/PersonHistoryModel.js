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
      field: '_v',
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
    created: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
    deleted: {
      type: DataTypes.DATE,
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

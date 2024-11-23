import {DataTypes} from "sequelize";

export default (sequelize) => {
  const PersonModel = sequelize.define('PersonModel', {
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
    tableName: 'person',
    timestamps: true,
  });

  PersonModel.associate = (models) => {
    PersonModel.belongsTo(models.UserModel, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
    PersonModel.belongsTo(models.UserModel, {
      foreignKey: 'updatedBy',
      as: 'updater',
    });
    PersonModel.belongsTo(models.UserModel, {
      foreignKey: 'deletedBy',
      as: 'deleter',
    });
  }

  return PersonModel;
}

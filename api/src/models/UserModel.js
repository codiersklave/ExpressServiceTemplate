import {DataTypes} from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
  const UserModel = sequelize.define('UserModel', {
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
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
    tableName: 'user',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  });

  UserModel.associate = (models) => {
    UserModel.belongsTo(models.UserModel, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
    UserModel.belongsTo(models.UserModel, {
      foreignKey: 'updatedBy',
      as: 'updater',
    });
    UserModel.belongsTo(models.UserModel, {
      foreignKey: 'deletedBy',
      as: 'deleter',
    });
  }

  return UserModel;
}

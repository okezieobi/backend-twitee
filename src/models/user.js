import { Model, DataTypes } from 'sequelize';

import bcryptUtil from '../utils/bcrypt';

export default class User extends Model {
  static async createOne(user, transaction) {
    await this.create(user, { transaction });
    return this.findOne({
      where: {
        email: user.email,
      },
      transaction,
      attributes: {
        exclude: ['password', 'updatedAt'],
      },
    });
  }

  static async findByUnique({ email }, transaction, exclude = []) {
    return this.findOne({
      where: {
        email,
      },
      transaction,
      attributes: {
        exclude,
      },
    });
  }

  static async findById(id, transaction) {
    return this.findByPk(id, {
      transaction,
      attributes: {
        exclude: ['password'],
      },
    });
  }

  static associate(models) {
    this.hasManyEntries = this.hasMany(models.twit, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(256),
          allowNull: false,
          notEmpty: true,
        },
        username: {
          type: DataTypes.STRING(256),
          get() {
            const atIndex = this.email.indexOf('@');
            return this.email.slice(0, atIndex);
          },
        },
        email: {
          type: DataTypes.STRING(256),
          allowNull: false,
          unique: true,
          notEmpty: true,
          isEmail: true,
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
          notEmpty: true,
          set(value) {
            this.setDataValue('password', bcryptUtil.hashString(value));
          },
        },
        type: {
          type: DataTypes.TEXT,
          defaultValue: 'Client',
          isIn: [['Client', 'Admin']],
        },
      },
      {
        sequelize,
        modelName: 'User',
      },
    );
  }
}

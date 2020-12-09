import { Model } from 'sequelize';
import bcrypt from 'bcrypt';

export default class User extends Model {
  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static columns(DataTypes) {
    return {
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
          const name = this.email.slice(0, atIndex);
          return name.charAt(0).toUpperCase() + name.slice(1);
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
          const salt = bcrypt.genSaltSync();
          this.setDataValue('password', bcrypt.hashSync(value, salt));
        },
      },
      type: {
        type: DataTypes.TEXT,
        defaultValue: 'Client',
        isIn: [['Client', 'Admin']],
      },
    };
  }

  static init(sequelize, DataTypes) {
    return super.init(
      {
        ...this.columns(DataTypes),
      },
      {
        sequelize,
        modelName: 'User',
      },
    );
  }
}

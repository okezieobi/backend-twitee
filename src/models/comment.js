import { Model } from 'sequelize';

export default class Comment extends Model {
  static associate({ user, twit }) {
    this.belongsToUser = this.belongsTo(user, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });

    this.belongsToTwit = this.belongsTo(twit, {
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static columns(DataTypes) {
    return {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },
    };
  }

  static init(sequelize, DataTypes) {
    return super.init({
      ...this.columns(DataTypes),
    },
    {
      sequelize,
      modelName: 'Comment',
    });
  }
}

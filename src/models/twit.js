import { Model } from 'sequelize';

export default class Twit extends Model {
  static associate(models) {
    this.belongsToUser = this.belongsTo(models.user, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
      modelName: 'Twit',
    });
  }
}

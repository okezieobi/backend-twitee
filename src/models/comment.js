import { Model, DataTypes } from 'sequelize';

export default class Comment extends Model {
  static async createOne({ content, UserId, TwitId }, transaction) {
    return this.create({
      content,
      UserId,
      TwitId,
    }, {
      transaction,
    });
  }

  static async findByTwit(id, { user }, transaction) {
    return this.findAndCountAll({
      include: { model: user, attributes: ['name', 'email'] },
      where: {
        TwitId: id,
      },
      offset: 0,
      limit: 50,
      transaction,
      attributes: {
        exclude: ['UserId', 'TwitId'],
      },
    });
  }

  static associate(models) {
    this.belongsToUser = this.belongsTo(models.user, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });

    this.belongsToTwit = this.belongsTo(models.twit, {
      foreignKey: {
        allowNull: false,
      },
    });
  }

  static init(sequelize) {
    return super.init({
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
    },
    {
      sequelize,
      modelName: 'Comment',
    });
  }
}

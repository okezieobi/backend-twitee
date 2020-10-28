import { Model, DataTypes, Op } from 'sequelize';

export default class Twit extends Model {
  static async createOne({ content, id }, transaction) {
    return this.create({
      content,
      UserId: id,
    }, {
      transaction,
    });
  }

  static async findEvery(transaction) {
    return this.findAndCountAll({
      offset: 0,
      limit: 50,
      transaction,
    });
  }

  static async findAllByOwnerId(id, transaction) {
    return this.findAndCountAll({
      where: {
        UserId: id,
      },
      offset: 0,
      limit: 50,
      transaction,
    });
  }

  static async findOneByOwnerId({ UserId, id }, transaction) {
    return this.findOne({
      where: {
        [Op.and]: [
          { UserId }, { id },
        ],
      },
      transaction,
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
      modelName: 'Twit',
    });
  }
}

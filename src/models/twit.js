import { Model, DataTypes, Op } from 'sequelize';

export default class Twit extends Model {
  static async createOne({ title, body, id }, transaction) {
    return this.create({
      title,
      body,
      UserId: id,
    }, {
      transaction,
    });
  }

  static async findAllByOwnerId(id, transaction) {
    return this.findAll({
      where: {
        UserId: id,
      },
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
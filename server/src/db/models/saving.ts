import type {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import type Budget from "./budget";

export default class Saving extends Model<
  InferAttributes<Saving>,
  InferCreationAttributes<Saving>
> {
  declare id: CreationOptional<number>;

  declare user_id: ForeignKey<Budget["id"]>;
  declare amount: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static associate(models: { Budget: typeof Budget }) {
    this.belongsTo(models.Budget, { foreignKey: "user_id" });
  }

  static initModel(sequelize: Sequelize): typeof Saving {
    return Saving.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },

        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: "Saving",
        sequelize,
      },
    );
  }
}

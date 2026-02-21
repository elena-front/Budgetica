import { sequelize } from "../config/database";
import Budget from "./budget";
import Category from "./category";
import Saving from "./saving";
import Transaction from "./transaction";

import User from "./user";

User.initModel(sequelize);
Budget.initModel(sequelize);
Category.initModel(sequelize);
Saving.initModel(sequelize);
Transaction.initModel(sequelize);

export { sequelize, User, Budget, Category, Saving, Transaction };

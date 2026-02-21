import { sequelize } from "../config/database";

import User from "./user";

User.initModel(sequelize);

export { sequelize, User };

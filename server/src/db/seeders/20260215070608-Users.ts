import { hash } from "bcrypt";
import type { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "test1",
          email: "test1@mail.com",
          password: await hash("tesjkdfst1", 10),
        },
        {
          name: "example",
          email: "example@mail.com",
          password: await hash("esfdxa25mp#$le", 10),
        },
        {
          name: "user1",
          email: "user1@mail.com",
          password: await hash("tuseGJ123r", 10),
        },
      ],
      {},
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Users", {});
  },
};

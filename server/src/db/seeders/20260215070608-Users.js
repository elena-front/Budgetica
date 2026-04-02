const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "test1",
          email: "test1@mail.com",
          password: await bcrypt.hash("tesjkdfst1", 10),
        },
        {
          name: "example",
          email: "example@mail.com",
          password: await bcrypt.hash("esfdxa25mp#$le", 10),
        },
        {
          name: "user1",
          email: "user1@mail.com",
          password: await bcrypt.hash("tuseGJ123r", 10),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {});
  },
};

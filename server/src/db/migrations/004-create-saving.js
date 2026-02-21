/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Savings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      budget_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Budgets",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Savings");
  },
};

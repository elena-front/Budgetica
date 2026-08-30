"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert(
      "Budgets",
      [
        {
          id: 1,
          month: 2,
          year: 2026,
          total_amount: 90000,
          user_id: 1,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 2,
          month: 3,
          year: 2026,
          total_amount: 95000,
          user_id: 1,
          createdAt: now,
          updatedAt: now,
        },
        {
          id: 3,
          month: 4,
          year: 2026,
          total_amount: 98000,
          user_id: 1,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      "Categories",
      [
        { id: 1, budget_id: 1, name: "🏠 Коммунальные", budget_limit: 18000, createdAt: now, updatedAt: now },
        { id: 2, budget_id: 1, name: "📚 Школа/секции", budget_limit: 14000, createdAt: now, updatedAt: now },
        { id: 3, budget_id: 1, name: "🛒 Еда", budget_limit: 26000, createdAt: now, updatedAt: now },
        { id: 4, budget_id: 1, name: "⛽ Бензин", budget_limit: 9000, createdAt: now, updatedAt: now },
        { id: 5, budget_id: 1, name: "🎭 Развлечения", budget_limit: 6000, createdAt: now, updatedAt: now },
        { id: 6, budget_id: 1, name: "💊 Здоровье", budget_limit: 5000, createdAt: now, updatedAt: now },

        { id: 7, budget_id: 2, name: "🏠 Коммунальные", budget_limit: 18500, createdAt: now, updatedAt: now },
        { id: 8, budget_id: 2, name: "📚 Школа/секции", budget_limit: 15000, createdAt: now, updatedAt: now },
        { id: 9, budget_id: 2, name: "🛒 Еда", budget_limit: 28000, createdAt: now, updatedAt: now },
        { id: 10, budget_id: 2, name: "⛽ Бензин", budget_limit: 9500, createdAt: now, updatedAt: now },
        { id: 11, budget_id: 2, name: "👕 Одежда", budget_limit: 7000, createdAt: now, updatedAt: now },
        { id: 12, budget_id: 2, name: "🎉 Праздники", budget_limit: 6500, createdAt: now, updatedAt: now },

        { id: 13, budget_id: 3, name: "🏠 Коммунальные", budget_limit: 19000, createdAt: now, updatedAt: now },
        { id: 14, budget_id: 3, name: "📚 Школа/секции", budget_limit: 15000, createdAt: now, updatedAt: now },
        { id: 15, budget_id: 3, name: "🛒 Еда", budget_limit: 29000, createdAt: now, updatedAt: now },
        { id: 16, budget_id: 3, name: "⛽ Бензин", budget_limit: 10000, createdAt: now, updatedAt: now },
        { id: 17, budget_id: 3, name: "🎬 Развлечения", budget_limit: 8000, createdAt: now, updatedAt: now },
        { id: 18, budget_id: 3, name: "🐾 Питомцы", budget_limit: 4500, createdAt: now, updatedAt: now },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      "Transactions",
      [
        { category_id: 1, amount: 17200, createdAt: new Date("2026-02-05"), updatedAt: new Date("2026-02-05") },
        { category_id: 2, amount: 12000, createdAt: new Date("2026-02-09"), updatedAt: new Date("2026-02-09") },
        { category_id: 3, amount: 21450, createdAt: new Date("2026-02-12"), updatedAt: new Date("2026-02-12") },
        { category_id: 3, amount: 3100, createdAt: new Date("2026-02-21"), updatedAt: new Date("2026-02-21") },
        { category_id: 4, amount: 7200, createdAt: new Date("2026-02-18"), updatedAt: new Date("2026-02-18") },
        { category_id: 5, amount: 4300, createdAt: new Date("2026-02-23"), updatedAt: new Date("2026-02-23") },
        { category_id: 6, amount: 2800, createdAt: new Date("2026-02-26"), updatedAt: new Date("2026-02-26") },

        { category_id: 7, amount: 17900, createdAt: new Date("2026-03-04"), updatedAt: new Date("2026-03-04") },
        { category_id: 8, amount: 14250, createdAt: new Date("2026-03-08"), updatedAt: new Date("2026-03-08") },
        { category_id: 9, amount: 19600, createdAt: new Date("2026-03-10"), updatedAt: new Date("2026-03-10") },
        { category_id: 9, amount: 5400, createdAt: new Date("2026-03-22"), updatedAt: new Date("2026-03-22") },
        { category_id: 10, amount: 8800, createdAt: new Date("2026-03-16"), updatedAt: new Date("2026-03-16") },
        { category_id: 11, amount: 6100, createdAt: new Date("2026-03-19"), updatedAt: new Date("2026-03-19") },
        { category_id: 12, amount: 4700, createdAt: new Date("2026-03-28"), updatedAt: new Date("2026-03-28") },

        { category_id: 13, amount: 18450, createdAt: new Date("2026-04-02"), updatedAt: new Date("2026-04-02") },
        { category_id: 14, amount: 13800, createdAt: new Date("2026-04-03"), updatedAt: new Date("2026-04-03") },
        { category_id: 15, amount: 16200, createdAt: new Date("2026-04-01"), updatedAt: new Date("2026-04-01") },
        { category_id: 15, amount: 5200, createdAt: new Date("2026-04-03"), updatedAt: new Date("2026-04-03") },
        { category_id: 16, amount: 6900, createdAt: new Date("2026-04-02"), updatedAt: new Date("2026-04-02") },
        { category_id: 17, amount: 3800, createdAt: new Date("2026-04-03"), updatedAt: new Date("2026-04-03") },
        { category_id: 18, amount: 2100, createdAt: new Date("2026-04-03"), updatedAt: new Date("2026-04-03") },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      "Savings",
      [
        {
          id: 1,
          user_id: 1,
          amount: 18750,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {},
    );

    await queryInterface.sequelize.query(
      'SELECT setval(\'"Budgets_id_seq"\', (SELECT MAX(id) FROM "Budgets"));',
    );
    await queryInterface.sequelize.query(
      'SELECT setval(\'"Categories_id_seq"\', (SELECT MAX(id) FROM "Categories"));',
    );
    await queryInterface.sequelize.query(
      'SELECT setval(\'"Savings_id_seq"\', (SELECT MAX(id) FROM "Savings"));',
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Transactions", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Budgets", null, {});
    await queryInterface.bulkDelete("Savings", null, {});
  },
};

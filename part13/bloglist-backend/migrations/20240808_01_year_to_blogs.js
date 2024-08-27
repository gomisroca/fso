const { DataTypes } = require("sequelize");

const currentYear = new Date().getFullYear();

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
      allowNull: false,
      min: 1991,
      max: currentYear,
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};

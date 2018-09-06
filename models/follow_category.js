'use strict';
module.exports = (sequelize, DataTypes) => {
  const follow_category = sequelize.define('follow_category', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  follow_category.associate = function (models) {
    // associations can be defined here
  };
  return follow_category;
};
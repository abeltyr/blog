'use strict';
module.exports = (sequelize, DataTypes) => {
  const follow_user = sequelize.define('follow_user', {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    follower_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    followed_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  follow_user.associate = function (models) {
    // associations can be defined here
  };
  return follow_user;
};
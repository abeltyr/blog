'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
      id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          validate: {
              notEmpty: true
          }
      },
      email: {
        type: DataTypes.STRING,
        validate:{
            notEmpty: false
        }
    },
      name: {
          type: DataTypes.STRING,
          validate:{
              notEmpty: true
          }
      }

  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
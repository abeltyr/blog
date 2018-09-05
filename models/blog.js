'use strict';
const withPagination = require('sequelize-simple-pagination');

module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
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
    title: {
      type: DataTypes.STRING,
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {});
  blog.associate = function (models) {
    // associations can be defined here
  };
  return blog;
};

const options = {
  methodName: 'paginate', // the name of the pagination method
  primaryKey: 'id', // the primary key field of the model
};

// Add a pagination method for the model
withPagination(4)(15);
'use strict';
const comment = require("./comment")
module.exports = (sequelize, DataTypes) => {
  // const comment = sequelize.import(__dirname + "/comment")
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
  blog.associate = function (comment) {
    // associations can be defined here
    // blog.hasMany(comment, {
    //   foreignKey: 'blog_id',
    //   sourceKey: 'id'
    // })
    // comment.belongsTo(blog, {
    //   foreignKey: 'blog_id',
    //   targetKey: 'id'
    // });
  };

  return blog;
};
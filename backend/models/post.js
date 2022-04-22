"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Like);
      models.User.hasMany(models.Post);

      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Post.init(
    {
      User_id: DataTypes.INTEGER,
      titre: DataTypes.STRING,
      content: DataTypes.STRING,
      except: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

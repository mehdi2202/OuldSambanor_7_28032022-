
module.exports= (sequelize, DataTypes) => {
    const Like = sequelize.define('Like', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            generated: true,
            allowNull : false,
        },
        UserId : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        PostId : {
            type: DataTypes.INTEGER,
            allowNull : false,
        }
    });
    Like.associate = function(models){
        Like.belongsTo(models.User, { onDelete: "cascade"});
        Like.belongsTo(models.Post, { onDelete: "cascade"});
    }
    return Like;
}
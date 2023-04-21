
module.exports= (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        post_content: {
            type: DataTypes.TEXT,
            allowNull: false, 
        }, 
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        like:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    Post.associate = function(models){
        Post.belongsTo(models.User);
        Post.hasMany(models.Comment, { onDelete: "cascade"});
        Post.hasMany(models.Like,{ onDelete: "cascade"});
    }
    return Post;
};

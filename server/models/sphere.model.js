module.exports = (sequelize, Sequelize) => {
    const Sphere = sequelize.define("sphere", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        index: {
            type: Sequelize.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
    });


    return Sphere;
};
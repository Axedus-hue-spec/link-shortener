import Sequelize from 'sequelize';
import sequelize from '../db.js';

export const Link = sequelize.define('Link', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    from: {
        type: Sequelize.STRING, 
        required: true
    },
    to: {
        type: Sequelize.STRING, 
        required: true, 
        unique: true
    },
    code: {
        type: Sequelize.STRING, 
        required: true, 
        unique: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
//   clicks: {type: Number, default: 0},
})

export const User = sequelize.define('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING,
        required: true,  
        unique: true
    },
    password: {
        type: Sequelize.STRING, 
        required: true
    },
});

User.hasMany(Link);
Link.belongsTo(User);
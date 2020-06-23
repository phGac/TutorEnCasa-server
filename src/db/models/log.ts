import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Log extends Model {
    id!: number;
    
    level!: string;
    type!: string|null;
    message!: string;
    ip!: string;
    path!: string;

    readonly createdAt!: Date;
}

Log.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING(25)
    },
    level: {
        type: DataTypes.STRING(20)
    },
    message: {
        type: DataTypes.STRING(255)
    },
    ip: {
        type: DataTypes.STRING(40)
    },
    path: {
        type: DataTypes.STRING(300)
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { sequelize, timestamps: false });

export default Log;
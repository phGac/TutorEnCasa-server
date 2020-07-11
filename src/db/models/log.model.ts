import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Log extends Model {
    readonly id!: number;
    
    readonly level!: string;
    readonly type!: string|null;
    readonly message!: string;
    readonly ip!: string;
    readonly path!: string;
    readonly trace!: string;

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
        type: DataTypes.STRING(40),
        allowNull: true
    },
    path: {
        type: DataTypes.STRING(300)
    },
    trace: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, { sequelize, timestamps: false });

export default Log;
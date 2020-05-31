import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class TimeAvailability extends Model {
    public id!: number;
    public id_user!: number;

    public start!: Date;
    public finish!: Date;
    public status!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

TimeAvailability.init({
    id: {
        type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
    },
    id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    finish: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
		allowNull: true
    }
}, { sequelize });

// @ts-ignore
TimeAvailability.associate = function(models) {
    //
};

export { TimeAvailability };
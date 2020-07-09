import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class AvailabilityTime extends Model {
    public id!: number;
    public id_tutor!: number;

    public start!: Date;
    public minutes!: number;
    public status!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

AvailabilityTime.init({
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
    minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 60
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
AvailabilityTime.associate = function(models) {
    const { Tutor } = models;
    AvailabilityTime.belongsTo(Tutor, {
        as: 'tutor',
        foreignKey: 'id_tutor'
    });
};

enum AvailabilityTimeStatus {
    INACTIVE,
    ACTIVE
}

export {
    AvailabilityTimeStatus
}

export default AvailabilityTime;
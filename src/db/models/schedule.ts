import { DataTypes, Model } from 'sequelize';
import sequelize from '../index';

class Schedule extends Model {
    public id!: number;
    public id_class!: number;
    public id_student!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

Schedule.init({
    id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
    },
    id_class: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_student: {
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
Schedule.associate = function(models) {
	//
};

export default Schedule;
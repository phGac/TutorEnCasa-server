import { Model, DataTypes } from "sequelize";

import sequelize from '../index';

class ClassTime extends Model {
    id!: number;
    id_class!: number;
    id_availability_time!: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

ClassTime.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_class: {
        type: DataTypes.INTEGER
    },
    id_availability_time: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, { sequelize });

export default ClassTime;
import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class StudentTutor extends Model {
    public id_student!: number;
    public id_tutor!: number;
    
    public status!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date|null;
}

StudentTutor.init({
    id_student: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tutor: {
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
StudentTutor.associate = function() {
    //
};

export default StudentTutor;
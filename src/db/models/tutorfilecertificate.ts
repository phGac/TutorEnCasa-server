import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class TutorFileCertificate extends Model {
    id!: number;
    id_tutor!: number;
    id_file!: number;

    type!: number;
    description!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

TutorFileCertificate.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_tutor: {
        type: DataTypes.INTEGER
    },
    id_file: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, { sequelize });

// @ts-ignore
TutorFileCertificate.associate = function(models) {
    const { Tutor, File } = models;
    TutorFileCertificate.belongsTo(Tutor, {
        as: 'tutor',
        foreignKey: 'id_tutor'
    });
    TutorFileCertificate.hasOne(File, {
        as: 'file',
        foreignKey: 'id_file'
    });
}

export enum TutorFileCertificateType {
    ENROLLMENT,
    GRADUATE
}

export default TutorFileCertificate;
import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class File extends Model {
    id!: number;

    name!: string;
    mime!: string;
    key!: string;

    readonly createdAt!: Date;
}

File.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100)
    },
    mime: {
        type: DataTypes.STRING(20)
    },
    key: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    timestamps: false
});

// @ts-ignore
File.associate = function(models) {
    const { TutorFileCertificate } = models;

    File.hasOne(TutorFileCertificate, {
        as: 'tutor_certificate',
        foreignKey: 'id_file'
    });
}

export default File;
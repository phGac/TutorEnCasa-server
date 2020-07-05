import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class File extends Model {
    id!: number;

    name!: string;
    mime!: string;
    key!: string;
    url!: string;

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
    url: {
        type: DataTypes.STRING(300)
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    timestamps: false
});

export default File;
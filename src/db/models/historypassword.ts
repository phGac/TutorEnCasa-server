import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';
import { encryptPassword } from '../../services/hash';

class HistoryPassword extends Model {
    public id!: number;
    public id_user!: number;

    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

HistoryPassword.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, { sequelize });

HistoryPassword.beforeCreate(function(historyPassword, options) {
	return new Promise((resolve, reject) => {
		if(historyPassword.password) {
			encryptPassword(historyPassword.password)
				.then((hash) => {
					if(typeof hash == 'string')
                    historyPassword.password = hash;
					resolve();
				})
				.catch(err => {
					reject(err);
				});
		}
	});
});

// @ts-ignore
HistoryPassword.associate = function(models) {
    const { User } = models;
    HistoryPassword.belongsTo(User, {
        as: 'user',
        foreignKey: 'id_user'
    });
};

export default HistoryPassword;
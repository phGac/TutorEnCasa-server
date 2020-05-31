import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from '../index';
import { encryptPassword } from '../../services/hash';
import logger from '../../util/logger';

class User extends Model {
    public id!: number;
    public firstname!: string|null;
	public lastname!: string|null;
	public email!: string;
	public password!: string;
	public dni!: number;
	public status!: number;

    public readonly createdAt!: Date;
	public readonly updatedAt!: Date|null;
	
	isValidPassword(password: string) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, this.password, (err, result) => {
				if(err) return reject(err);
				resolve(result);
			});
		});
	}

	setPassword(password: string, passwordRepeat: string) {
        return new Promise((resolve, reject) => {
            if(password != passwordRepeat) return reject('Las contraseñas no coinciden');
            encryptPassword(password)
                .then((hash) => {
                    if(typeof hash == 'string') {
                        this.password = hash;
                        resolve();
                    }
                    else {
                        reject('El tipo de la variable es incorrecto');
                    }
                })
                .catch(err => {
					logger().error(err);
					reject('Desconocido');
				});
        });
	}
}

User.init({
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		autoIncrement: true,
		primaryKey: true
	},
	firstname: {
		type: DataTypes.STRING(50),
		allowNull: true
	},
	lastname: {
		type: DataTypes.STRING(50),
		allowNull: true
	},
	email: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	password: {
		type: DataTypes.STRING(100),
		allowNull: false
	},
	dni: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	status: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW
	}
}, { sequelize });

User.beforeCreate(function(user, options) {
	return new Promise((resolve, reject) => {
		if(user.password) {
			encryptPassword(user.password)
				.then((hash) => {
					if(typeof hash == 'string')
						user.password = hash;
					resolve();
				})
				.catch(err => {
					reject(err);
				});
		}
	});
});

// @ts-ignore
User.associate = function(models) {
	//
};

export { User };
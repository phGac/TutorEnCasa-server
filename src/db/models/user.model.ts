import { Model, DataTypes, fn, col } from 'sequelize';
import bcrypt from 'bcrypt';

import sequelize from '../index';
import HistoryPassword from './historypassword.model';
import Coupon from './coupon.model';
import { loginMessage } from '../../config/messages';

class User extends Model {
	public id!: number;
	
    public firstname!: string|null;
	public lastname!: string|null;
	public email!: string;
	public dni!: number;
	public passwords!: HistoryPassword[];
	public birthdate!: Date|null;
	public status!: number;
	public coupons!: Coupon[];

    public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	
	isValidPassword(password: string) {
		return new Promise((resolve, reject) => {
			if(! this.passwords || this.passwords.length == 0) {
				reject({ error: loginMessage["user.hasNotPassword"], custom: true });
				return;
			}
			const historyPassword = (this.passwords[(this.passwords.length-1)]);
			bcrypt.compare(password, historyPassword.password, (err, result) => {
				if(err) return reject(err);
				resolve(result);
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
	dni: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	birthdate: {
		type: DataTypes.DATE,
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

// @ts-ignore
User.associate = function(models) {
	const { Tutor, Schedule, Class, HistoryAccess, HistoryPassword, ClassRating, Administrator, Coupon, CouponGift } = models;
	User.hasMany(HistoryPassword, {
		as: 'passwords',
		foreignKey: 'id_user'
	});
	User.belongsToMany(Class, {
		as: 'classes',
		through: Schedule,
		foreignKey: 'id_student',
		otherKey: 'id_class'
	});
	User.hasMany(HistoryAccess, {
		as: 'accesses',
		foreignKey: 'id_user'
	});
	User.hasMany(ClassRating, {
		as: 'ratings',
		foreignKey: 'id_user'
	});
	User.hasOne(Tutor, {
		as: 'role_tutor',
		foreignKey: 'id_user'
	});
	User.hasOne(Administrator, {
		as: 'role_administrator',
		foreignKey: 'id_user'
	});
	User.hasMany(Coupon, {
		as: 'coupons',
		foreignKey: 'id_user'
	});
	User.hasMany(CouponGift, {
		as: 'gifts',
		foreignKey: 'id_user'
	});
};

export enum UserStatus {
	ACTIVE,
	INACTIVE,
	UNVALIDATED
};

export enum UserRole {
	STUDENT,
	TUTOR,
	ADMINISTRATOR,
}

export default User;
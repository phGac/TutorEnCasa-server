import { DataTypes, Model } from 'sequelize';

import sequelize from '../index';

class Payment extends Model {
    id!: string;

    token!: string;
    value!: number;
    status!: number;
    currency!: string;
    subject!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

Payment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Id external service'
    },
    value: {
        type: DataTypes.INTEGER
    },
    currency: {
        type: DataTypes.STRING(3)
    },
    subject: {
        type: DataTypes.STRING(100)
    },
    status: {
        type: DataTypes.INTEGER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}, { sequelize });

enum PaymentStatus {
    PENDING,
    VERIFYING,
    CANCELLED,
    PAID,
}

export {
    PaymentStatus
}

export default Payment;
import { DataTypes, Model } from 'sequelize';
import { v4 as uuid } from 'uuid';

import sequelize from '../index';

class Payment extends Model {
    id!: string;

    token!: string;
    value!: number;
    status!: number;
    currency!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

Payment.init({
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: uuid(),
        primaryKey: true
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
    UNPAID,
    PAID,
    CANCELLED
}

export {
    PaymentStatus
}

export default Payment;
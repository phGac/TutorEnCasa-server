import { Model } from "sequelize";

class ClassTime extends Model {
    id!: number;
    id_class!: number;
    id_availability_time!: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

export default ClassTime;
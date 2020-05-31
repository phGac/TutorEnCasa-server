import Student from './student';

class Tutor extends Student {
    protected priceHour: number;

    constructor(data: { 
        id: number|null,
        firstname: string, 
        lastname: string, 
        email: string, 
        password: string|null,
        priceHour: number,
        dni: number, 
        status: number,
        isAdmin: boolean,
        createdAt: Date|null,
        modifiedAt: Date|null
    }) {
        super(data);
        this.priceHour = data.priceHour;
    }
}

export default Tutor;
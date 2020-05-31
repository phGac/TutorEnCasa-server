import User from './user';

class Student extends User {
    protected firstname: string;
    protected lastname: string;

    constructor(data: { 
        id: number|null,
        firstname: string, 
        lastname: string, 
        email: string, 
        password: string|null, 
        dni: number, 
        status: number,
        isAdmin: boolean,
        createdAt: Date|null,
        modifiedAt: Date|null
    }) {
        super(data);
        this.firstname = data.firstname;
        this.lastname = data.lastname;
    }
}

export default Student;
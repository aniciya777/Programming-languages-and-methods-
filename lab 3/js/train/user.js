// Класс пользователя
export class User {
    constructor(name, sname, phone) {
        this.name = name; // Имя
        this.sname = sname; // Фамилия
        this.phone = phone; // Номер телефона
    }

    toString() {
        return this.sname + ' ' + this.name;
    }
}
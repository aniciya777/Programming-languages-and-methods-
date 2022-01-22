// Класс для хранения только времени (без даты)
class Time {
    constructor(hours, minutes) {
        this.minutes = minutes + hours * 60;
    }

    getHours() {
        return Math.floor(this.minutes / 60) % 24;
    }

    getMinutes() {
        return this.minutes % 60;
    }

    addMinutes(addition) {
        return new Time(0, this.minutes + addition);
    }

    getIntValue(val) {
        if (val < 10) {
            return '0' + val;
        }
        return val.toString();
    }

    toString() {
        return this.getIntValue(this.getHours()) + ':' + this.getIntValue(this.getMinutes());
    }
}

// Класс пользователя
class User {
    constructor(name, sname, phone) {
        this.name = name; // Имя
        this.sname = sname; // Фамилия
        this.phone = phone; // Номер телефона
    }

    toString() {
        return this.sname + ' ' + this.name;
    }
}

// Класс станции (вокзала, города и т.п.)
class Station {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

// Класс направления следования поезда
class Direction {
    constructor(station1, station2) {
        this.station1 = station1;
        this.station2 = station2;
    }

    toString() {
        return `${this.station1} -> ${this.station2}`
    }
}

// Класс рейса поезда
class Flight {
    constructor(direction, timeStart, daysOnWeek) {
        this.direction = direction;
        this.timeStart = timeStart;
        this.duration = 0;
        this.daysOnWeek = daysOnWeek;
        if (daysOnWeek === undefined) {
            this.daysOnWeek = Array(7).fill(false);
        }
    }

    setDuration(minutes, hours, days) {
        this.duration = minutes;
        if (hours !== undefined) {
            this.duration += 60 * hours;
        }
        if (days !== undefined) {
            this.duration += 24 * 60 * days;
        }
        return this;
    }

    getNumber() {
        return this.direction.station1.toString()[0].toUpperCase() +
            this.direction.station2.toString()[0].toUpperCase() + this.timeStart.toString().substr(null, 2);
    }

    toString() {
        let text = `Рейс ${this.getNumber()} ${this.direction}\nДни недели: `;
        let daysOfWeek = Array();
        for (let i = 0; i < 7; ++i) {
            if (this.daysOnWeek[i]) {
                daysOfWeek.push(days[i]);
            }
        }
        if (daysOfWeek.length === 0) {
            text += 'рейсов нет';
        } else {
            text += daysOfWeek.join(', ')
        }
        text += `\nОтправление в ${this.timeStart}`;
        text += `\nПрибытие в ${this.timeStart.addMinutes(this.duration)}\nДлительность`;
        let day = Math.floor(this.duration / 60 / 24);
        let hours = Math.floor(this.duration / 60) % 24;
        let minutes = this.duration % 60;
        if (day) {
            text += ` суток ${day}`;
        }
        if (hours) {
            text += ` часов ${hours}`;
        }
        if (minutes) {
            text += ` минут ${minutes}`;
        }
        return text;
    }
}

const days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
];
const cities = [
    new Station('Волгоград'),
    new Station('Волжский'),
    new Station('Дубовка'),
    new Station('Жирновск'),
    new Station('Калач-на-Дону'),
    new Station('Камышин'),
    new Station('Котельниково'),
    new Station('Котово'),
    new Station('Краснослободск'),
    new Station('Ленинск'),
    new Station('Михайловка'),
    new Station('Новоаннинский'),
    new Station('Палласовка'),
    new Station('Петров Вал'),
    new Station('Серафимович'),
    new Station('Суровикино'),
    new Station('Урюпинск'),
    new Station('Фролово'),
    new Station('Уфа'),
    new Station('Стерлитамак'),
    new Station('Ишимбай'),
    new Station('Салават')
]

const directions = [
    new Direction(cities[18], cities[0]), // Уфа -> Волгоград
    new Direction(cities[0], cities[1]), // Волгоград -> Волжский
    new Direction(cities[7], cities[19]), // Котово -> Стерлитамак
]
const flights = [
    new Flight(directions[0], new Time(12, 20), [1, 0, 0, 0, 1, 0, 0])
        .setDuration(20, 1, 1),
    new Flight(directions[0], new Time(6, 5), [0, 1, 0, 0, 0, 0, 0])
        .setDuration(45, 0, 1),
    new Flight(directions[1], new Time(12, 0), [1, 1, 1, 1, 1, 1, 1])
        .setDuration(40, 0, 0),
    new Flight(directions[2], new Time(18, 0), [0, 0, 0, 0, 1, 1, 0])
        .setDuration(20, 3, 1),
]
const user = new User('Анастасия', 'Остапчук', '88005553535');

console.log('Рейсы:')
for (let i = 0; i < 4; ++i) {
    console.log(`${i + 1}) ${flights[i]}`);
    console.log('-'.repeat(30));
}
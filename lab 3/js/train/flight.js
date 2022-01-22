// Класс рейса поезда
export class Flight {
    constructor(direction, timeStart, daysOnWeek, price) {
        this.direction = direction;
        this.timeStart = timeStart;
        this.duration = 0;
        this.daysOnWeek = daysOnWeek;
        this.price = price;
        if (daysOnWeek === undefined) {
            this.daysOnWeek = Array(7).fill(false);
        }
    }

    getTimeStart() {
        return this.timeStart;
    }

    getTimeEnd() {
        return this.timeStart.addMinutes(this.duration);
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

    getDurationString() {
        let text = '';
        let day = Math.floor(this.duration / 60 / 24);
        let hours = Math.floor(this.duration / 60) % 24;
        let minutes = this.duration % 60;
        if (day) {
            text = `${day} дн.`;
        }
        if (hours) {
            text += ` ${hours} ч`;
        }
        if (minutes) {
            text += ` ${minutes} мин`;
        }
        return text.trim();
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
        text += `\nОтправление в ${this.getTimeStart()}`;
        text += `\nПрибытие в ${this.getTimeEnd()}`;
        text += `\nДлительность ${this.getDurationString()}`;
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
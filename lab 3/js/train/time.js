// Класс для хранения только времени (без даты)
export class Time {
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

    toDate(date) {
        let new_date = new Date(date);
        new_date.setMinutes(this.minutes);
        return new_date;
    }
}
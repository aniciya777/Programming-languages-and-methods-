// Класс направления следования поезда
export class Direction {
    constructor(station1, station2) {
        this.station1 = station1;
        this.station2 = station2;
    }

    toString() {
        return `${this.station1} -> ${this.station2}`
    }
}
import { ObservationEntry, ObservationEntryList } from "../@Types/ObservationEntry";

const getObs = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
}

const createData = (time: string, wind: number, pressure: number, temperature: number, clouds: number): ObservationEntry  => {
    return { time, wind, pressure, temperature, clouds };
}

export const createRandomObs = (nRows: number): ObservationEntryList => {
    let rows = new  Array<ObservationEntry>();
    for (let i = 0; i < nRows; i++) {
        rows.push(createData((i + 1) +':00', getObs(1, 10), getObs(1000, 1025), getObs(15, 25), getObs(0, 99)));
    }
    return rows;
}
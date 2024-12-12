
export interface ObservationEntry {
    time: string;
    wind: number;
    pressure: number;
    temperature: number;
    clouds: number;
};

export type ObservationEntryList = Array<ObservationEntry>;

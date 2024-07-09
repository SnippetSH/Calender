interface renderDateState {
    month: number;
    year: number;
}

type datesType = {
    prev : {
        DiM: number;
        SDoW: number;
    },
    cur : {
        DiM: number;
        SDoW: number;
        CD: number;
    },
    next : {
        DiM: number;
        SDoW: number;
    }
}

export type {renderDateState, datesType};
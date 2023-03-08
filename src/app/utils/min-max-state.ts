import { RegExp } from '../utils/reg-exp';
import { State } from '../interfaces/state';

export const findMinAndMaxState = (rows : any[]) => {
    const STATE = 'Province_State';
    const states : any[] = [];
    rows.map(row => {
        const keys = Object.keys(row);
        const summary = keys.reduce((acc : number, key : string) => {
            if(RegExp.DATE.test(key)) acc += row[key];
            return acc;
        }, 0);
        states.push({ stateName: row[STATE], summary });
    });
    const groupState = groupSummaryByState(states);
    return findMaxAndMin(groupState);
}

const groupSummaryByState = (states: State[]) => {
    return states.reduce((acc, state) => {
        const stateName = state.stateName;
        if(!acc[stateName]) acc[stateName] = 0;
        acc[stateName] = acc[stateName] + state.summary;   
        return acc;
    }, {});
}

const findMaxAndMin = (states: any) => {
    const numbers = Object.values(states);
    const keys = Object.keys(states);
    const minNumber = Math.min.apply(null, numbers);
    const maxNumber = Math.max.apply(null, numbers);
    const indexMin = numbers.indexOf(minNumber);
    const indexMax = numbers.indexOf(maxNumber);
    return {
        min: {
            state: keys[indexMin],
            summary: numbers[indexMin]
        },
        max: {
            state: keys[indexMax],
            summary: numbers[indexMax]
        }
    };
}

import { scaleLinear, scaleBand} from 'd3';

export const Scales = {
    linear: (min_value, max_value, start_pos, end_pos) => {
        return scaleLinear()
            .range([start_pos, end_pos])
            .domain([min_value, max_value])
            .nice();
        },
    band: (discreteValueArray, start_pos, end_pos) => {
        return scaleBand()
        .range([start_pos, end_pos])
        .domain(discreteValueArray);
    }
}
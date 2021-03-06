'use strict';

const atmlib = require('../lib/atmosphere');

const TROPOSPHERE_VALUES = [
    0,
    3.7,
    11
];
const THERMOSPHERE_VALUES = [
    87,
    95.6,
    450.1,
    500
];

describe('Atmosphere module', function() {
    it('can determine layer of atmosphere from altitude', () => {
        const {getStrata} = atmlib;
        TROPOSPHERE_VALUES.forEach((altitude) => {
            expect(getStrata(altitude)).toEqual('troposphere');
        });
        THERMOSPHERE_VALUES.forEach((altitude) => {
            expect(getStrata(altitude)).toEqual('thermosphere');
        });
    });
    it('can calculate molecular weight of atmosphere', () => {
        const {molecularWeight} = atmlib;
        expect(molecularWeight(0)).toEqual(28.964);
        expect(molecularWeight(12)).toEqual(26.66);
        expect(molecularWeight(21)).toEqual(16.17);
        expect(molecularWeight(22)).toEqual(28.964);
    });
    it('can calculate speed of sound based on altitude', () => {
        const {speedOfSound} = atmlib.calculate;
        expect(speedOfSound()).toBeCloseTo(340.9, 1)// speed of sound at sea-level, 340.29
        expect(speedOfSound(1000)).toBeCloseTo(295.6, 1); // 336.103
        expect(speedOfSound(10000)).toBeCloseTo(295.6, 1);// 299.63,  299.5 (1962, 1976)
        expect(speedOfSound(50000)).toBeCloseTo(332.8, 1);// 329.799, 329.8 (1962, 1976)
        expect(speedOfSound(80000)).toBeCloseTo(267.1, 1);// 269.44,  282.5 (1962, 1976)
        expect(speedOfSound(84000)).toBeCloseTo(272.1, 1);// 269.44,  276.9 (1962, 1976)
        expect(speedOfSound(86000)).toBeCloseTo(274.6, 1);// 269.44,  274.1 (1962, 1976)
    });
    it('can convert m/s <<>> mach', () => {
        const {speedOfSound} = atmlib.calculate;
        const toMach = atmlib.convert.metersPerSecondToMach;
        expect(toMach(speedOfSound())).toEqual(1);
        expect(toMach(speedOfSound(), 0)).toEqual(1);
        expect(toMach(speedOfSound(10000), 10000)).toEqual(1);
    });
});

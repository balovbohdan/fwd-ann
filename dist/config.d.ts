declare const config: Readonly<{
    ann: {
        defParams: {
            learningSpeed: number;
            inputSignals: {
                offset: number;
                needOffset: boolean;
                needNormalize: boolean;
                normalizer: (signals: import("./lib/signals").Signals) => import("./lib/signals").Signals;
            };
        };
    };
    teacher: {
        defParams: {
            epoches: number;
        };
    };
}>;
export default config;

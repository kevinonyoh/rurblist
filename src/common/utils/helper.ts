export const generateOtp = () => {
    return Math.random().toString().slice(2, 8);
};

export const convertTimeToMilliseconds = (time: number, measurement: 'hours' | 'minutes' | 'seconds') => {
    switch (measurement) {
        case 'hours':
            return time * 60 * 60 * 1000;
        case 'minutes':
            return time * 60 * 1000;
        case 'seconds':
            return time * 1000;
        default:
            return 0;
    }
};

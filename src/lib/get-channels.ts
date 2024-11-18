export function getChannels(input: number | undefined): string | undefined {
    switch (input) {
        case 1:
            return "1.0";
        case 2:
            return "2.0";
        case 3:
            return "2.1";
        case 4:
            return "4.2";
        case 5:
            return "5.0";
        case 6:
            return "5.1";
        case 7:
            return "5.2";
        case 8:
            return "7.1";
        case 9:
            return "7.2";
        default:
            return;
    }
}

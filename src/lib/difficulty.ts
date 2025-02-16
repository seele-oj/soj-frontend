export function diffMajor(major_level: number) {
    if (major_level > 9)
        return "10";
    else
        return "0" + major_level.toString();
}

export function diffAlt(major_level: number) {
    switch (major_level) {
        case 1:
        case 2:
        case 3:
            return "Moon";
        case 4:
        case 5:
        case 6:
            return "Star";
        case 7:
        case 8:
            return "Stella";
        case 9:
        case 10:
            return "Meteor";
        default:
            return "Moon";
    }
}

export function diffImg(major_level: number) {
    switch (major_level) {
        case 1:
        case 2:
        case 3:
            return "/moon.svg";
        case 4:
        case 5:
        case 6:
            return "/star.svg";
        case 7:
        case 8:
            return "/stella.svg";
        case 9:
        case 10:
            return "/meteor.svg";
        default:
            return "/moon.svg";
    }
}
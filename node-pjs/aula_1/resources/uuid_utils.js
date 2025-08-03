import { v1, v4, v6 } from "uuid";

export function generateUUID(versionNumber = 4) {
    switch (versionNumber) {
        case 1:
            return v1();
        case 4:
            return v4();
        case 6:
            return v6();
        default:
            throw new Error('Invalid UUID version');
    }
}
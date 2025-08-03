export const randomNames = [
    'Alice',
    'Bob',
    'Charlie',
    'Diana',
    'Ethan',
    'Fiona',
    'George',
    'Hannah',
    'Ian',
    'Julia',
    'Kevin',
    'Laura'
];

export function getRandomName() {
    return randomNames[Math.floor(Math.random() * randomNames.length)];
}
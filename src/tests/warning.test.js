import { lint } from '../index';

const testFirstRile1 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "l" } }
    ]
}`;
const resultFirstRile1 = [];

const testFirstRile2 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;
const resultFirstRile2 = [
    {
        "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        "error": "В блоке warning все блоки text должны быть одного размера",
        "location": {
            "start": { "column": 1, "line": 1 },
            "end": { "column": 2, "line": 7 }
        }
    }
];


const testSecondRile1 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}`;
const resultSecondRile1 = [];

const testSecondRile2 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}`;
const resultSecondRile2 = [
    {
        "code": "WARNING.INVALID_BUTTON_SIZE",
        "error": "В блоке warning размер блока button должен быть на 1 шаг больше эталонного",
        "location": {
            "start": { "column": 9, "line": 5 },
            "end": { "column": 55, "line": 5 }
        }
    }
];


const testThirdRile1 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } }
    ]
}`;
const resultThirdRile1 = [];

const testThirdRile2 = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;
const resultThirdRile2 = [
    {
        "code": "WARNING.INVALID_BUTTON_POSITION",
        "error": "В блоке warning блок button не может находиться перед блоком placeholder",
        "location": {
            "start": { "column": 9, "line": 4 },
            "end": { "column": 55, "line": 4 }
        }
    }
];


const testFourthRile1 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;
const resultFourthRile1 = [];

const testFourthRile2 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}`;
const resultFourthRile2 = [
    {
        "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
        "error": "В блоке warning блок placeholder должен быть размера s, m или l",
        "location": {
            "start": { "column": 9, "line": 4 },
            "end": { "column": 61, "line": 4 }
        }
    }
];


describe('Правила линтинга блока warning', () => {

    describe('№1 В блоке warning все блоки text должны быть одного размера', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testFirstRile1)).toStrictEqual(resultFirstRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testFirstRile2)).toStrictEqual(resultFirstRile2);
        });
    });

    describe('№2 В блоке warning размер блока button должен быть на 1 шаг больше эталонного', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testSecondRile1)).toStrictEqual(resultSecondRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testSecondRile2)).toStrictEqual(resultSecondRile2);
        });
    });

    describe('№3 В блоке warning блок button не может находиться перед блоком placeholder', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testThirdRile1)).toStrictEqual(resultThirdRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testThirdRile2)).toStrictEqual(resultThirdRile2);
        });
    });

    describe('№4 В блоке warning блок placeholder должен быть размера s, m или l', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testFourthRile1)).toStrictEqual(resultFourthRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testFourthRile2)).toStrictEqual(resultFourthRile2);
        });
    });
});

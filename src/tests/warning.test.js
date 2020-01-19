import { lint } from '../index';

const testFirstRule1 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "l" } }
    ]
}`;
const resultFirstRule1 = [];

const testFirstRule2 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "text", "mods": { "size": "m" } }
    ]
}`;
const resultFirstRule2 = [
    {
        "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
        "error": "В блоке warning все блоки text должны быть одного размера",
        "location": {
            "start": { "column": 1, "line": 1 },
            "end": { "column": 2, "line": 7 }
        }
    }
];

const testSecondRule1 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "xl" } }
    ]
}`;
const resultSecondRule1 = [];

const testSecondRule2 = `{
    "block": "warning",
    "content": [
        { "block": "text", "mods": { "size": "l" } },
        { "block": "button", "mods": { "size": "s" } }
    ]
}`;
const resultSecondRule2 = [
    {
        "code": "WARNING.INVALID_BUTTON_SIZE",
        "error": "В блоке warning размер блока button должен быть на 1 шаг больше эталонного",
        "location": {
            "start": { "column": 9, "line": 5 },
            "end": { "column": 55, "line": 5 }
        }
    }
];

const testThirdRule1 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } },
        { "block": "button", "mods": { "size": "m" } }
    ]
}`;
const resultThirdRule1 = [];

const testThirdRule2 = `{
    "block": "warning",
    "content": [
        { "block": "button", "mods": { "size": "m" } },
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;
const resultThirdRule2 = [
    {
        "code": "WARNING.INVALID_BUTTON_POSITION",
        "error": "В блоке warning блок button не может находиться перед блоком placeholder",
        "location": {
            "start": { "column": 9, "line": 4 },
            "end": { "column": 55, "line": 4 }
        }
    }
];

const testFourthRule1 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "m" } }
    ]
}`;
const resultFourthRule1 = [];

const testFourthRule2 = `{
    "block": "warning",
    "content": [
        { "block": "placeholder", "mods": { "size": "xl" } }
    ]
}`;
const resultFourthRule2 = [
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
            expect(lint(testFirstRule1)).toStrictEqual(resultFirstRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testFirstRule2)).toStrictEqual(resultFirstRule2);
        });
    });

    describe('№2 В блоке warning размер блока button должен быть на 1 шаг больше эталонного', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testSecondRule1)).toStrictEqual(resultSecondRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testSecondRule2)).toStrictEqual(resultSecondRule2);
        });
    });

    describe('№3 В блоке warning блок button не может находиться перед блоком placeholder', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testThirdRule1)).toStrictEqual(resultThirdRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testThirdRule2)).toStrictEqual(resultThirdRule2);
        });
    });

    describe('№4 В блоке warning блок placeholder должен быть размера s, m или l', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testFourthRule1)).toStrictEqual(resultFourthRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testFourthRule2)).toStrictEqual(resultFourthRule2);
        });
    });
});

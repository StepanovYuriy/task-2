import { lint } from '../index';

const testFirstRule1 = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const resultFirstRule1 = [];

const testFirstRule2 = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const resultFirstRule2 = [
    {
        "code": "TEXT.SEVERAL_H1",
        "error": "Заголовок первого уровня на странице должен быть единственным",
        "location": {
            "start": { "column": 5, "line": 6 },
            "end": { "column": 6, "line": 9 }
        }
    }
];

const testSecondRule1 = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;
const resultSecondRule1 = [];

const testSecondRule2 = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const resultSecondRule2 = [
    {
        "code": "TEXT.INVALID_H2_POSITION",
        "error": "Заголовок второго уровня не может находиться перед заголовком первого уровня",
        "location": {
            "start": { "column": 5, "line": 2 },
            "end": { "column": 6, "line": 5 }
        }
    }
];

const testThirdRule1 = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h3" }
    }
]`;
const resultThirdRule1 = [];

const testThirdRule2 = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;
const resultThirdRule2 = [
    {
        "code": "TEXT.INVALID_H3_POSITION",
        "error": "Заголовок третьего уровня не может находиться перед заголовком второго уровня",
        "location": {
            "start": { "column": 5, "line": 2 },
            "end": { "column": 6, "line": 5 }
        }
    }
];

describe('Правила линтинга блока text', () => {
    describe('№1 Заголовок первого уровня на странице должен быть единственным', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testFirstRule1)).toStrictEqual(resultFirstRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testFirstRule2)).toStrictEqual(resultFirstRule2);
        });
    });

    describe('№2 Заголовок второго уровня не может находиться перед заголовком первого уровня', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testSecondRule1)).toStrictEqual(resultSecondRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testSecondRule2)).toStrictEqual(resultSecondRule2);
        });
    });

    describe('№3 Заголовок третьего уровня не может находиться перед заголовком второго уровня', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testThirdRule1)).toStrictEqual(resultThirdRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testThirdRule2)).toStrictEqual(resultThirdRule2);
        });
    });
});

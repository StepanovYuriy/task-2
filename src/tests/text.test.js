import { lint } from '../index';

const testFirstRile1 = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const resultFirstRile1 = [];

const testFirstRile2 = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const resultFirstRile2 = [
    {
        "code": "TEXT.SEVERAL_H1",
        "error": "Заголовок первого уровня на странице должен быть единственным",
        "location": {
            "start": { "column": 5, "line": 6 },
            "end": { "column": 6, "line": 9 }
        }
    }
];


const testSecondRile1 = `[
    {
        "block": "text",
        "mods": { "type": "h1" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;
const resultSecondRile1 = [];

const testSecondRile2 = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h1" }
    }
]`;
const resultSecondRile2 = [
    {
        "code": "TEXT.INVALID_H2_POSITION",
        "error": "Заголовок второго уровня не может находиться перед заголовком первого уровня",
        "location": {
            "start": { "column": 5, "line": 2 },
            "end": { "column": 6, "line": 5 }
        }
    }
];


const testThirdRile1 = `[
    {
        "block": "text",
        "mods": { "type": "h2" }
    },
    {
        "block": "text",
        "mods": { "type": "h3" }
    }
]`;
const resultThirdRile1 = [];

const testThirdRile2 = `[
    {
        "block": "text",
        "mods": { "type": "h3" }
    },
    {
        "block": "text",
        "mods": { "type": "h2" }
    }
]`;
const resultThirdRile2 = [
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
            expect(lint(testFirstRile1)).toStrictEqual(resultFirstRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testFirstRile2)).toStrictEqual(resultFirstRile2);
        });
    });

    describe('№2 Заголовок второго уровня не может находиться перед заголовком первого уровня', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testSecondRile1)).toStrictEqual(resultSecondRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testSecondRile2)).toStrictEqual(resultSecondRile2);
        });
    });

    describe('№3 Заголовок третьего уровня не может находиться перед заголовком второго уровня', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testThirdRile1)).toStrictEqual(resultThirdRile1);
        });
        test('Пример из readme с ошибкой', () => {
            expect(lint(testThirdRile2)).toStrictEqual(resultThirdRile2);
        });
    });
});

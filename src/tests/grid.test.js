import { lint } from '../index';

const testFirstRule1 = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
}`;
const resultFirstRule1 = [];

const testFirstRule2 = `{
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
}`;
const resultFirstRule2 = [
    {
        "code": "GRID.TOO_MUCH_MARKETING_BLOCKS",
        "error": "Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid",
        "location": {
            "start": { "column": 1, "line": 1 },
            "end": { "column": 2, "line": 32 }
        }
    }
];

describe('Правила линтинга блока grid', () => {
    describe('№1 Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid', () => {
        test('Пример из readme без ошибки', () => {
            expect(lint(testFirstRule1)).toStrictEqual(resultFirstRule1);
        });

        test('Пример из readme с ошибкой', () => {
            expect(lint(testFirstRule2)).toStrictEqual(resultFirstRule2);
        });
    });
});

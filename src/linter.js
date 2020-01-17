import jsonToAst from 'json-to-ast';

export const parseJson = (json) => {
    try {
        return jsonToAst(json);
    } catch (e) {
        console.error(`Ошибка при обработке jsonToAst: ${e}`);
    }
};

export const getAllBlock = (node, validator, callback) => {
    if (!node) return;
    switch (node.type) {
        case 'Array':
            node.children.forEach((item) => {
                getAllBlock(item, validator, callback);
            });
            break;
        case 'Object':
            if (validator(node)) callback(node);
            node.children.forEach((item) => {
                getAllBlock(item, validator, callback);
            });
            break;
        case 'Property':
            getAllBlock(node.value, validator, callback);
            break;
    }
};

export const getError = (block, code) => {
    return {
        "code": code,
        "error": getTextByCode(code),
        "location": getLocation(block.loc),
    };
};

export const getLocation = ({ start, end }) => {
    return {
        "start": {
            "column": start.column,
            "line": start.line,
        },
        "end": {
            "column": end.column,
            "line": end.line,
        },
    };
};

export const getNextSize = (size) => {
    switch (size) {
        case 'xxxxs': return 'xxxs';
        case 'xxxs': return 'xxs';
        case 'xxs': return 'xs';
        case 'xs': return 's';
        case 's': return 'm';
        case 'm': return 'l';
        case 'l': return 'xl';
        case 'xl': return 'xxl';
        case 'xxl': return 'xxxl';
        case 'xxxl': return 'xxxxl';
        case 'xxxxl': return 'xxxxxl';
        case 'xxxxxl': return 'xxxxxxl';
        default: return null;
    }
};

export const getTextByCode = (code) => {
    switch (code) {
        case 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL':
            return 'В блоке warning все блоки text должны быть одного размера';

        case 'WARNING.INVALID_BUTTON_SIZE':
            return 'В блоке warning размер блока button должен быть на 1 шаг больше эталонного';

        case 'WARNING.INVALID_BUTTON_POSITION':
            return 'В блоке warning блок button не может находиться перед блоком placeholder';

        case 'WARNING.INVALID_PLACEHOLDER_SIZE':
            return 'В блоке warning блок placeholder должен быть размера s, m или l';

        case 'TEXT.SEVERAL_H1':
            return 'Заголовок первого уровня на странице должен быть единственным';

        case 'TEXT.INVALID_H2_POSITION':
            return 'Заголовок второго уровня не может находиться перед заголовком первого уровня';

        case 'TEXT.INVALID_H3_POSITION':
            return 'Заголовок третьего уровня не может находиться перед заголовком второго уровня';

        case 'GRID.TOO_MUCH_MARKETING_BLOCKS':
            return 'Маркетинговые блоки должны занимать не больше половины от всех колонок блока grid';

        default:
            return `Неизвестный код ошибки: ${code}`;
    }
};

export const infoFunctionalBlocks = [
    'payment',
    'warning',
    'product',
    'history',
    'cover',
    'collect',
    'articles',
    'subscribtion',
    'event'
];

export const marketingBlocks = ['commercial', 'offer'];

import { getAllBlock, getError } from '../linter';
import { getBlockName, getModType } from '../validators';

export const validateBlockText = (json) => {
    let errors = [];

    severalH1(json, (blockText) => {
        errors.push(getError(blockText, 'TEXT.SEVERAL_H1'));
    });

    invalidH2Position(json, (blockText) => {
        errors.push(getError(blockText, 'TEXT.INVALID_H2_POSITION'));
    });

    invalidH3Position(json, (blockText) => {
        errors.push(getError(blockText, 'TEXT.INVALID_H3_POSITION'));
    });

    return errors;
};

/**
 * Правило линтинга блока warning №1:
 * Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным.
 */
export const severalH1 = (json, callback) => {
    let hasH1 = false;
    getAllBlock(json,
        (node) => getBlockName(node) === 'text',
        (blockText) => {
            const type = getModType(blockText);
            if (type === 'h1') {
                if (!hasH1) {
                    hasH1 = true;
                } else {
                    callback(blockText);
                }
            }
        }
    );
};

/**
 * Правило линтинга блока warning №2:
 * Заголовок второго уровня (блок text с модификатором type h2) не может находиться
 * перед заголовком первого уровня на том же или более глубоком уровне вложенности.
 */
export const invalidH2Position = (json, callback) => {
    let queueWithH2 = [];
    getAllBlock(json,
        (node) => getBlockName(node) === 'text',
        (blockText) => {
            const type = getModType(blockText);
            switch (type) {
                case 'h2':
                    queueWithH2.push(blockText);
                    break;
                case 'h1':
                    queueWithH2.forEach((blockTextH2) => callback(blockTextH2));
                    queueWithH2 = [];
                    break;
            }
        }
    );
};

/**
 * Правило линтинга блока warning №3:
 * Заголовок третьего уровня (блок text с модификатором type h3) не может находиться
 * перед заголовком второго уровня на том же или более глубоком уровне вложенности.
 */
export const invalidH3Position = (json, callback) => {
    let queueWithH3 = [];
    getAllBlock(json,
        (node) => getBlockName(node) === 'text',
        (blockText) => {
            const type = getModType(blockText);
            switch (type) {
                case 'h3':
                    queueWithH3.push(blockText);
                    break;
                case 'h2':
                    queueWithH3.forEach((blockTextH3) => callback(blockTextH3));
                    queueWithH3 = [];
                    break;
            }
        }
    );
};

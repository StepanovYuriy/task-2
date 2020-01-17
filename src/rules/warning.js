import { getBlockName, getModSize } from '../validators';
import { getNextSize, getAllBlock, getError } from '../linter';

export const validateBlockWarning = (json) => {
    let errors = [];

    getAllBlock(json,
        (node) => getBlockName(node) === 'warning',
        (blockWarning) => {
            let standartSize = null;
            const hasError = textSizesShouldBeEqual(blockWarning, (size) => standartSize = size);
            if (hasError) {
                errors.push(getError(blockWarning, 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL'));
            }

            invalidButtonSize(blockWarning, standartSize, (blockButton) => {
                errors.push(getError(blockButton, 'WARNING.INVALID_BUTTON_SIZE'));
            });

            invalidButtonPosition(blockWarning, (blockButton) => {
                errors.push(getError(blockButton, 'WARNING.INVALID_BUTTON_POSITION'));
            });

            invalidPlaceholderSize(blockWarning, (blockPlaceholder) => {
                errors.push(getError(blockPlaceholder, 'WARNING.INVALID_PLACEHOLDER_SIZE'));
            });
        }
    );

    return errors;
};

/**
 * Правило линтинга блока warning №1:
 * Все тексты (блоки text) в блоке warning должны быть одного размера,
 * то есть c одинаковым значением модификатора size,
 * и этот размер должен быть определен.
 * Размер первого из таких элементов в форме будем считать эталонным.
 */
export const textSizesShouldBeEqual = (blockWarning, callback) => {
    let result = false;
    let standartSize = null;
    getAllBlock(blockWarning,
        (node) => getBlockName(node) === 'text',
        (blockText) => {
            if (result) return;
            const size = getModSize(blockText);
            if (size) {
                if (!standartSize) {
                    standartSize = size;
                    callback(standartSize);
                } else if (standartSize !== size) {
                    result = true;
                }
            }
        }
    );
    return result;
};

/**
 * Правило линтинга блока warning №2:
 * Размер кнопки блока warning должен быть на 1 шаг больше эталонного
 */
export const invalidButtonSize = (blockWarning, standartSize, callback) => {
    const expectedSizeButton = getNextSize(standartSize);
    if (expectedSizeButton) {
        getAllBlock(blockWarning,
            (node) => getBlockName(node) === 'button',
            (blockButton) => {
                const size = getModSize(blockButton);
                if (size) {
                    if (size !== expectedSizeButton) {
                        callback(blockButton);
                    }
                }
            }
        );
    }
};

/**
 * Правило линтинга блока warning №3:
 * Блок button в блоке warning не может находиться перед блоком placeholder
 * на том же или более глубоком уровне вложенности.
 */
export const invalidButtonPosition = (blockWarning, callback) => {
    let queueWithButtons = [];
    getAllBlock(blockWarning,
        (node) => ['placeholder', 'button'].includes(getBlockName(node)),
        (block) => {
            const blockName = getBlockName(block);
            switch (blockName) {
                case 'button':
                    queueWithButtons.push(block);
                    break;
                case 'placeholder':
                    queueWithButtons.forEach((blockButton) => callback(blockButton));
                    queueWithButtons = [];
                    break;
            }
        }
    );
};

/**
 * Правило линтинга блока warning №4:
 * Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l.
 */
export const invalidPlaceholderSize = (blockWarning, callback) => {
    getAllBlock(blockWarning,
        (node) => getBlockName(node) === 'placeholder',
        (blockPlaceholder) => {
            const size = getModSize(blockPlaceholder);
            if (size) {
                if (!['s', 'm', 'l'].includes(size)) {
                    callback(blockPlaceholder);
                }
            }
        }
    );
};

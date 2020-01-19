import { getAllBlocks, getError, infoFunctionalBlocks, marketingBlocks } from '../linter';
import { getBlockName, isBlockGridWithModMColumns, isBlockGridWithElemModMCol, getElemModMCol } from '../validators';

export const validateBlockGrid = (json) => {
    let errors = [];

    getAllBlocks(json,
        (node) => isBlockGridWithModMColumns(node),
        (blockGridContainer) => {
            const hasError = tooMuchMarketingBlock(blockGridContainer);

            if (hasError) {
                errors.push(getError(blockGridContainer, 'GRID.TOO_MUCH_MARKETING_BLOCKS'));
            }
        }
    );

    return errors;
};

/**
 * Правило линтинга блока grid №1:
 * Все контентные блоки в интерфейсе можно разделить на два типа:
 * Информационно-функциональные: payment, warning, product, history, cover, collect, articles, subscribtion, event;
 * Маркетинговые: commercial, offer.
 * Нужно проверить, что маркетинговые блоки занимают не больше половины от всех колонок блока grid.
 * Считается, что одну колонку может занимать только один из вышеописанных блоков.
 */
export const tooMuchMarketingBlock = (blockGridContainer) => {
    let countInfoFunctionalBlocks = 0, countMarketingBlocks = 0;
    const allValidContentBlocks = infoFunctionalBlocks.concat(marketingBlocks);

    getAllBlocks(blockGridContainer,
        (node) => isBlockGridWithElemModMCol(node),
        (blockGridColumn) => {
            const count = parseInt(getElemModMCol(blockGridColumn));

            if (count > 0) {
                getAllBlocks(blockGridColumn,
                    (node) => allValidContentBlocks.includes(getBlockName(node)),
                    (blockInColumn) => {
                        const name = getBlockName(blockInColumn);

                        if (infoFunctionalBlocks.includes(name)) {
                            countInfoFunctionalBlocks += count;
                        } else if (marketingBlocks.includes(name)) {
                            countMarketingBlocks += count;
                        }
                    }
                );
            }
        }
    );

    return countMarketingBlocks > countInfoFunctionalBlocks;
};

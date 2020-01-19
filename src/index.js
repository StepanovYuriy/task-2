import { parseJson } from './linter';
import { validateBlockWarning } from './rules/warning';
import { validateBlockText } from './rules/text';
import { validateBlockGrid } from './rules/grid';

export function lint(string) {
    let errors = [];
    const json = parseJson(string);

    if (json) {
        errors = errors.concat(validateBlockWarning(json));
        errors = errors.concat(validateBlockText(json));
        errors = errors.concat(validateBlockGrid(json));
    }

    return errors;
}

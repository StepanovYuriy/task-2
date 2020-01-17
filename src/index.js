import { parseJson, checkNode } from './linter';
import { validateProperty, validateObject } from './validators';
import { validateBlockText } from './rules/text';

export function lint(json) {
    let errors = [];
    const ast = parseJson(json);
    if (ast) {
        checkNode(ast,
            (property) => errors = errors.concat(...validateProperty(property)),
            (object) => errors = errors.concat(...validateObject(object)));

        errors = errors.concat(...validateBlockText(ast));
    }
    return errors;
}

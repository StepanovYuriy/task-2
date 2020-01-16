import { parseJson, checkNode } from './linter';
import { validateProperty, validateObject } from './validators';

export function lint(json) {
    let errors = [];
    const ast = parseJson(json);
    if (ast) {
        checkNode(ast,
            (property) => errors = errors.concat(...validateProperty(property)),
            (object) => errors = errors.concat(...validateObject(object)));
    }
    return errors;
}

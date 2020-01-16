import { validateBlockWarning } from './rules/warning';

export const validateObject = (object) => {
    let errors = [];
    if (!object || !object.children || !object.children.length) return errors;

    const blockName = getBlockName(object);
    switch (blockName) {
        case 'warning':
            errors = errors.concat(...validateBlockWarning(object));
            break;
        default:
            break;
    }
    return errors;
};

export const validateProperty = (property) => {
    let errors = [];
    return errors;
}

export const getBlockName = (object) => {
    const property = object.children.find((property) => property.key.value === 'block');
    return (property && property.value.value) ? property.value.value : null;
}

export const getMods = (object) => {
    const property = object.children.find((property) => property.key.value === 'mods');
    if (!property) return null;
    return (property && property.value.type == 'Object') ? property.value : null;
}

export const getSize = (object) => {
    const property = object.children.find((property) => property.key.value === 'size');
    return (property && property.value.value) ? property.value.value : null;
}

export const getModSize = (object) => {
    let size = null;
    const mods = getMods(object);
    if (!mods) return size;
    return getSize(mods);
};

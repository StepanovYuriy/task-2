export const getBlockName = (object) => {
    const property = object.children.find((property) => property.key.value === 'block');
    return (property && property.value.value) ? property.value.value : null;
};

export const getMods = (object) => {
    const property = object.children.find((property) => property.key.value === 'mods');
    if (!property) return null;
    return (property && property.value.type == 'Object') ? property.value : null;
};

export const getElemMods = (object) => {
    const property = object.children.find((property) => property.key.value === 'elemMods');
    if (!property) return null;
    return (property && property.value.type == 'Object') ? property.value : null;
};

export const getSize = (object) => {
    const property = object.children.find((property) => property.key.value === 'size');
    return (property && property.value.value) ? property.value.value : null;
};

export const getType = (object) => {
    const property = object.children.find((property) => property.key.value === 'type');
    return (property && property.value.value) ? property.value.value : null;
};

export const getMCol = (object) => {
    const property = object.children.find((property) => property.key.value === 'm-col');
    return (property && property.value.value) ? property.value.value : null;
};

export const hasMColumns = (object) => {
    const property = object.children.find((property) => property.key.value === 'm-columns');
    return Boolean(property);
};

export const hasMCol = (object) => {
    const property = object.children.find((property) => property.key.value === 'm-col');
    return Boolean(property);
};

export const getModSize = (object) => {
    let size = null;
    const mods = getMods(object);
    if (!mods) return size;
    return getSize(mods);
};

export const getModType = (object) => {
    let type = null;
    const mods = getMods(object);
    if (!mods) return type;
    return getType(mods);
};

export const getElemModMCol = (object) => {
    let mCol = null;
    const mods = getElemMods(object);
    if (!mods) return mCol;
    return getMCol(mods);
};

export const hasModMColumns = (object) => {
    const mods = getMods(object);
    if (!mods) return false;
    return hasMColumns(mods);
};

export const hasElemModMCol = (object) => {
    const mods = getElemMods(object);
    if (!mods) return false;
    return hasMCol(mods);
};

export const isBlockGridWithModMColumns = (object) => {
    const isBlockGrid = getBlockName(object) === 'grid';
    if (!isBlockGrid) return false;
    return hasModMColumns(object);
};

export const isBlockGridWithElemModMCol = (object) => {
    const isBlockGrid = getBlockName(object) === 'grid';
    if (!isBlockGrid) return false;
    return hasElemModMCol(object);
};

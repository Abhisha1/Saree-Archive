export function checkIfWhitespaceonly(str){
    if (!str.replace(/\s/g, '').length) {
        return true;
    }
    return false;
}

export function isSpecialCharacters(str){
    if (!str.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, '').length) {
        return true;
    }
    return false;
}

export function cleanTrailingSpaces(str){
    return str.trim();
}

/**
 * Evita el error `RangeError: Maximum call stack size exceeded`
 * @param variable 
 * @param toSet 
 * @param getVarName 
 */
function dotdotdot(variable: any, toSet: any, getVarName: string|null = null) {
    if(! getVarName)
        for (const name in variable) toSet[name] = variable[name];
    else
        for (const name in variable) toSet[name] = variable[name][getVarName];
}

export {
    dotdotdot
};
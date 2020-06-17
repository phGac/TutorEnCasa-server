"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotdotdot = void 0;
/**
 * Evita el error `RangeError: Maximum call stack size exceeded`
 * @param variable
 * @param toSet
 * @param getVarName
 */
function dotdotdot(variable, toSet, getVarName = null) {
    if (!getVarName)
        for (const name in variable)
            toSet[name] = variable[name];
    else
        for (const name in variable)
            toSet[name] = variable[name][getVarName];
}
exports.dotdotdot = dotdotdot;

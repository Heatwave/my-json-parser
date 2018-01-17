// @ts-check
'use strict';

const STRING_ESCAPE_PATTERN = /\\(["\\/bfnrt])/;

function handleEmpty(json, state) {
    while (json[state.cursor] <= ' ') {
        state.cursor += 1;
        if (state.cursor > json.length - 1) {
            throw new SyntaxError('Unexpected end of JSON input');
        }
    }
}

function handleString(json, state) {
    if (json[state.cursor] !== '"') {
        throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
    }
    state.cursor += 1;

    let result = '';

    for (let index = state.cursor; index < json.length; index++) {
        const element = json[index];
        state.cursor = index;

        if (element === '"' && json[index - 1] !== '\\') {
            break;
        }

        result += element;
    }

    if (state.cursor === json.length) {
        throw new SyntaxError('Unexpected end of JSON input');
    }

    result = result.replace(STRING_ESCAPE_PATTERN, '$1');

    return result;
}

function handleNumber(json, state) {
    let result = '';

    while (json[state.cursor] !== ' ' && json[state.cursor] !== '}' && json[state.cursor] !== ']' && json[state.cursor] !== ',' && state.cursor < json.length) {
        if (['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'e', 'E', '+', '-'].indexOf(json[state.cursor]) === -1) {
            throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
        }

        result += json[state.cursor];

        state.cursor += 1;
    }

    state.cursor -= 1;

    return parseFloat(result);
}

function handleTrue(json, state) {
    const wanted = ['t', 'r', 'u', 'e'];
    for (let index = 0; index < wanted.length; index++) {
        const element = wanted[index];
        if (json[state.cursor] === element) {
            if (index === wanted.length - 1) {
                break;
            }
            state.cursor += 1;
            if (state.cursor > json.length - 1) {
                throw new SyntaxError('Unexpected end of JSON input');
            }
            continue;
        } else {
            throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
        }
    }
    return true;
}

function handleFalse(json, state) {
    const wanted = ['f', 'a', 'l', 's', 'e'];
    for (let index = 0; index < wanted.length; index++) {
        const element = wanted[index];
        if (json[state.cursor] === element) {
            if (index === wanted.length - 1) {
                break;
            }
            state.cursor += 1;
            if (state.cursor > json.length - 1) {
                throw new SyntaxError('Unexpected end of JSON input');
            }
            continue;
        } else {
            throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
        }
    }
    return false;
}

function handleNull(json, state) {
    const wanted = ['n', 'u', 'l', 'l'];
    for (let index = 0; index < wanted.length; index++) {
        const element = wanted[index];
        if (json[state.cursor] === element) {
            if (index === wanted.length - 1) {
                break;
            }
            state.cursor += 1;
            if (state.cursor > json.length - 1) {
                throw new SyntaxError('Unexpected end of JSON input');
            }
            continue;
        } else {
            throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
        }
    }
    return null;
}

function handleArray(json, state) {
    let result = [];

    state.cursor += 1;
    if (state.cursor === json.length) {
        throw new SyntaxError('Unexpected end of JSON input');
    }

    handleEmpty(json, state);

    while (json[state.cursor] !== ']') {
        if (json[state.cursor] !== ',') {
            result.push(hadnleValue(json, state));
            state.cursor += 1;
        } else {
            state.cursor += 1;
            if (json[state.cursor] && json[state.cursor] === ']') {
                throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
            }
        }
        if (state.cursor > json.length - 1) {
            throw new SyntaxError('Unexpected end of JSON input');
        }
        handleEmpty(json, state);
    }

    return result;
}

function hadnleValue(json, state) {
    if (json[state.cursor] === '"') {
        return handleString(json, state);
    } else if (json[state.cursor] === '{') {
        return handleObject(json, state);
    } else if (['-', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(json[state.cursor]) !== -1) {
        return handleNumber(json, state);
    } else if (json[state.cursor] === '[') {
        return handleArray(json, state);
    } else if (json[state.cursor] === 't') {
        return handleTrue(json, state);
    } else if (json[state.cursor] === 'f') {
        return handleFalse(json, state);
    } else if (json[state.cursor] === 'n') {
        return handleNull(json, state);
    } else {
        throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
    }
}

function handleKeyValueInObject(json, state) {
    handleEmpty(json, state);
    const key = handleString(json, state);
    state.cursor += 1;
    if (state.cursor > json.length - 1) {
        throw new SyntaxError('Unexpected end of JSON input');
    }
    handleEmpty(json, state);
    if (json[state.cursor] !== ':') {
        throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
    }
    state.cursor += 1;
    if (state.cursor > json.length - 1) {
        throw new SyntaxError('Unexpected end of JSON input');
    }
    handleEmpty(json, state);
    const value = hadnleValue(json, state);
    return { key: key, value: value };
}

function handleObject(json, state) {
    if (json[state.cursor] !== '{') {
        throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
    }
    state.cursor += 1;

    let result = {};

    handleEmpty(json, state);

    while (json[state.cursor] !== '}') {
        const keyValueObj = handleKeyValueInObject(json, state);
        result[keyValueObj.key] = keyValueObj.value;
        state.cursor += 1;
        if (state.cursor > json.length - 1) {
            throw new SyntaxError('Unexpected end of JSON input');
        }
        handleEmpty(json, state);
        if (json[state.cursor] === ',') {
            state.cursor += 1;
            if (state.cursor > json.length - 1 || json[state.cursor] === '}') {
                throw new SyntaxError('Unexpected end of JSON input');
            }
        } else if (json[state.cursor] === '}') {
            break;
        }
    }

    return result;
}

function parse(json) {
    if (typeof json === 'number' || typeof json === 'boolean' || json === null) {
        return json;
    }

    if (typeof json !== 'string') {
        throw new SyntaxError('the parameter is not a string');
    }

    json = json.trim();

    let state = {
        cursor: 0
    };

    const result = hadnleValue(json, state);

    state.cursor += 1;

    if (state.cursor !== json.length) {
        throw new SyntaxError(`Unexpected toekn ${json[state.cursor]} at position ${state.cursor}`);
    }

    return result;
}

module.exports = {
    parse: parse
};
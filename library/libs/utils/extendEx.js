
const hasOwn = Object.prototype.hasOwnProperty;
const toStr = Object.prototype.toString;
const defineProperty = Object.defineProperty;
const gOPD = Object.getOwnPropertyDescriptor;

const isArray = function isArray(arr) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(arr);
    }

    return toStr.call(arr) === '[object Array]';
};

const isPlainObject = function isPlainObject(obj) {
    if (!obj || toStr.call(obj) !== '[object Object]') {
        return false;
    }

    const hasOwnConstructor = hasOwn.call(obj, 'constructor');
    const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
    // Not own constructor property must be Object
    if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
    }

    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    let key;
    for (key in obj) { /**/ }

    return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
const setProperty = function setProperty(target, options) {
    if (defineProperty && options.name === '__proto__') {
        defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true,
        });
    } else {
        target[options.name] = options.newValue;
    }
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
const getProperty = function getProperty(obj, name) {
    if (name === '__proto__') {
        if (!hasOwn.call(obj, name)) {
            return void 0;
        } else if (gOPD) {
            // In early versions of node, obj['__proto__'] is buggy when obj has
            // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
            return gOPD(obj, name).value;
        }
    }

    return obj[name];
};

export default function extend() {
    let options,
        name,
        src,
        copy,
        copyIsArray,
        clone;
    let target = arguments[0];
    let i = 1;
    const length = arguments.length;
    let deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
    }
    if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
        target = {};
    }

    for (; i < length; ++i) {
        options = arguments[i];
        // Only deal with non-null/undefined values
        if (options != null) {
            // Extend the base object
            for (name in options) {
                src = getProperty(target, name);
                copy = getProperty(options, name);

                // Prevent never-ending loop
                if (target !== copy) {
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = (src && isArray(src) ? src : []).concat(copy);
                            // clone = src && isArray(src) ? src : [];

                            // Never move original objects, clone them
                            setProperty(target, { name, newValue: clone });
                        } else {
                            clone = src && isPlainObject(src) ? src : {};

                            // Never move original objects, clone them
                            setProperty(target, { name, newValue: extend(deep, clone, copy) });
                        }

                        // Don't bring in undefined values
                    } else if (typeof copy !== 'undefined') {
                        setProperty(target, { name, newValue: copy });
                    }
                }
            }
        }
    }

    // Return the modified object
    return target;
}

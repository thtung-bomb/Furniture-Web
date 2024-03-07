export function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}
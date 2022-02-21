const filterInPlace = (a, condition) => {
    let i = 0, j = 0;
    while (i < a.length) {
        const val = a[i];
        if (condition(val, i, a)) a[j++] = val;
        i++;
    }

    a.length = j;

    return a;
}

module.exports = { filterInPlace };
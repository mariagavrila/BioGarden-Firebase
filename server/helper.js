function toDate(dateStr) {
    var parts = dateStr.split("-")
    let t = new Date(parts[2], parts[1] - 1, parts[0])
    return t
}


function pad(n) {
    return n < 10 ? '0' + n : n
}

function checkField(value) {
    if (value !== null && value !== undefined) {
        return value
    } else {
        return ""
    }
}

function trimString(string) {
    let t = string.trim().toLowerCase()
    console.log(t)
    return t
}

module.exports = {
    toDate: toDate,
    pad: pad,
    checkField: checkField,
    trimString: trimString,
}

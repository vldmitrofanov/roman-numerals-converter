import { numbersMap, norepeat, substractive, maxIntNumber } from './numbers_map'
const convertA2R = (value) => {
    if (value == 0) return ''
    if (value < 0 || value > maxIntNumber) {
        return 'ERROR'
    }
    const a = [...(value.toString())]
    const last = a.length - 1
    let res = ''
    for (let i = last; i >= 0; i--) {
        if (a[i] == 0) continue
        let strNum = a[i].padEnd(last - i + 1, '0')
        strNum = convertNum2r(strNum)
        if (strNum == 'ERROR') return strNum
        res = strNum.concat(res)
    }
    return res
}

const convertNum2r = (ch) => {
    const num = parseInt(ch)
    const len = numbersMap.length

    for (let i = len - 1; i >= 0; i--) {
        // if we just can add same symbols
        const maxRepeat = norepeat.includes(i) ? 1 : 3
        for (let j = 1; j <= maxRepeat; j++) {
            if (num == numbersMap[i].value * j) {
                return ''.padEnd(j, numbersMap[i].symbol)
            }
        }
        // if we can get the number by substracting   
        const slen = substractive.length
        for (let j = slen - 1; j >= 0; j--) {
            const sind = substractive[j]
            if (sind >= i) continue
            if (numbersMap[i].value - numbersMap[sind].value == num) {
                return `${numbersMap[sind].symbol}${numbersMap[i].symbol}`
            }
        }
    }

    for (let i = 0; i < len; i++) {
        if (numbersMap[i].value < num && typeof numbersMap[i + 1] != 'undefined' && numbersMap[i + 1].value > num) {
            let prevRepInd = null

            for (let j = i; j >= 0; j--) {
                if (norepeat.includes(j)) continue
                prevRepInd = j
                break
            }
            if (prevRepInd === null) return 'ERROR'
            const rem = (num % numbersMap[i].value) / numbersMap[prevRepInd].value

            return numbersMap[i].symbol + ''.padEnd(rem, numbersMap[prevRepInd].symbol)

        }
    }
    return 'ERROR'
}

const convertR2A = (val) => {
    const arr = [...val] //[...r2a.value ]
    let substract = 0
    let res = 0
    let subIndexes = []
    const indexArray = []
    let prevIndex = -1
    arr.forEach((v, i) => {
            const ind = getIndex(v, 'symbol')
            indexArray.push(ind)
            if (prevIndex < ind && prevIndex >= 0) {
                subIndexes.push(i - 1)
            } else {
                prevIndex = ind
            }
        })
        // validation
    if (validateRnIndexes(indexArray, subIndexes) < 0) {
        return -1
    }

    const len = indexArray.length
    for (let i = 0; i < len; i++) {
        const pos = indexArray[i]
        if (subIndexes.includes(i)) {
            substract += parseInt(numbersMap[pos].value)
        } else {
            res += parseInt(numbersMap[pos].value)
        }
    }
    return res - substract
}
const validateRnIndexes = (indexes, subIndexes) => {
    const lensub = subIndexes.length

    for (let i = 0; i < lensub; i++) {
        const si = subIndexes[i]

        if (!substractive.includes(indexes[si])) {
            return -1
        }
        const prevIndex = si - 1
        if (prevIndex >= 0) {
            const prev = indexes[prevIndex]
            if (indexes[si] == prev) {
                return -1
            }
        }
        const nextInex = si + 2
        if (typeof indexes[nextInex] != 'undefined') {
            const nxt = indexes[nextInex]
            if (indexes[si] == nxt || indexes[si + 1] == nxt) {
                return -1
            }
        }
    }

    const len = indexes.length
    let lastChar = null
    let repeated = 0

    for (let i = 0; i < len; i++) {
        if (lastChar === null) {
            lastChar = indexes[i]
            continue
        }
        if (lastChar == indexes[i]) {
            if (norepeat.includes(lastChar)) {
                return -1
            }
            repeated++
        } else {
            repeated = 0
        }

        if (repeated >= 3) {
            return -1
        }
        lastChar = indexes[i]
    }
    return 1
}

const getIndex = (s, t) => {
    const len = numbersMap.length
    for (let i = 0; i < len; i++) {
        if (numbersMap[i][t] == s) {
            return i
        }
    }
}

export {
    convertA2R,
    convertR2A
}
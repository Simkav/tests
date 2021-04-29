const Datas = {
    testData: [1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false],
    testData2: [1, 2, 1990, 85, 24, 5, 7, 8.1],
    testData3: [{
        "name": "Vasya",
        "email": "vasya@example.com",
        "age": 20,
        "skills": { "php": 0, "js": -1, "madness": 10, "rage": 10 }
    }, {
        "name": "Dima",
        "email": "dima@example.com",
        "age": 34,
        "skills": { "php": 5, "js": 7, "madness": 3, "rage": 2 }
    }, {
        "name": "Colya",
        "email": "colya@example.com",
        "age": 46,
        "skills": { "php": 8, "js": -2, "madness": 1, "rage": 4 }
    }, {
        "name": "Misha",
        "email": "misha@example.com",
        "age": 16,
        "skills": { "php": 6, "js": 6, "madness": 5, "rage": 2 }
    }, {
        "name": "Ashan",
        "email": "ashan@example.com",
        "age": 99,
        "skills": { "php": 0, "js": 10, "madness": 10, "rage": 1 }
    }, {
        "name": "Rafshan",
        "email": "rafshan@example.com",
        "age": 11,
        "skills": { "php": 0, "js": 0, "madness": 0, "rage": 10 }
    }],
    testData4: [{ "name": "Vasya", "email": "vasya@example.com", "age": 20 }, {
        "name": "Dima",
        "email": "dima@example.com",
        "age": 34
    }, { "name": "Colya", "email": "colya@example.com", "age": 46 }, {
        "name": "Misha",
        "email": "misha@example.com",
        "age": 16
    }, { "name": "Ashan", "email": "ashan@example.com", "age": 99 }, {
        "name": "Rafshan",
        "email": "rafshan@example.com",
        "age": 11
    }, 1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false, [[[[1, 2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false, [{
        "name": "Rafshan",
        "email": "rafshan@example.com",
        "age": 11
    }]]]]]]
}
/*
1
 Напишите функцию cloneDeep таким образом, чтобы она была способна клонировать переданный как параметр объект.
 Лучше юзать что-то уже готовое и отдебаженое))
*/

const cloneDeep = (obj) => {
    if (!obj || Array.isArray(obj)) {
        throw new TypeError("Wrong type")
    }
    const newObj = {}
    for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
            newObj[key] = [...value]
            continue
        }
        if (value instanceof Object) {
            newObj[key] = cloneDeep(value)
            continue
        }
        newObj[key] = value
    }
    return newObj
}


/*
2
Свертка. Используйте метод reduce в комбинации с concat для свёртки массива массивов в один массив, у которого есть все элементы входных массивов.
Для многоуровневого добавить рекурсию, но зачем если есть флат?
*/

const flatAnalog = (arr) => {
    if (!Array.isArray(arr)) throw new TypeError("Not array")
    return arr.reduce((acc, val) => acc.concat(val), []);
}


/*
3
 Допустим, у вас есть функция primitiveMultiply, которая в 50% случаев перемножает 2 числа,
 а в остальных случаях выбрасывает исключение типа MultiplicatorUnitFailure. Напишите функцию,
 обёртывающую эту, и просто вызывающую её до тех пор, пока не будет получен успешный результат.
*/
function MultiplicatorUnitFailure() {
}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
        return a * b;
    else
        throw new MultiplicatorUnitFailure();
}

function reliableMultiply(a, b) {
    try {
        return primitiveMultiply(a, b)
    } catch (e) {
        return reliableMultiply(a, b)
    }
}

// console.log(reliableMultiply(8, 8))


//4. Расширить прототип Array, добавив к нему метод добавления элемента в начало без использование unshift.

Array.prototype.append = function (val) {
    this.reverse().push(val);
    return this.reverse()
};


// 5. Выведите все элементы массива используя рекурсию.


const recuseLog = (arr, pos = 0) => {
    if (!Array.isArray(arr)) throw new TypeError("Not arrray")
    if (arr.length <= pos) {
        return arr[pos]
    }
    console.log(arr[pos])
    recuseLog(arr, pos + 1)
}

/*
const arr = ['Solnce', 'vishlo', 'iz', 'za', 'tuchi'];
recuseLog(arr);
*/


//6. Написать функцию для выполнения параллельных вычислений без использования Promise.
//Не понял задачу


/*7. Сделать функцию поиска значений в массиве.
Синтаксис: array_find(arr: array, search: string|regex): string|number[]|null
*/

const parseRegExpString = (string) => {
    const regArr = string.split('/')
    regArr.shift()
    const flags = regArr.pop()
    const pattern = regArr.join('')
    return [pattern, flags]
}

// Не придумал как проверить строку на регулярку так что скостылил

const array_find = (arr, search) => {
    if (!Array.isArray(arr)) throw new TypeError("Not arrray")
    if (search[0] === '/') {
        const regExp = new RegExp(...parseRegExpString(search))
        return arr.filter((el) => {
            return regExp.test(el)
        })
    }
    return arr.filter((el) => {
        return el === search
    })
}

/*
console.log(array_find(Datas.testData, "Rafshan")) // ["Rafshan"]
console.log(array_find(Datas.testData, '/^raf.*!/i')) // ["Rafshan"]
*/

/*8. Сделать функцию которая обрезает массив до указанного значения.
    Синтаксис: array_skip_until(arr: array, value: any): any[]
*/

const array_skip_until = (arr, value) => {
    if (!Array.isArray(arr)) throw new TypeError("Not arrray")
    const index = arr.lastIndexOf(value)
    if (index === -1) return []
    return arr.slice(index)
}

/*console.log(array_skip_until(Datas.testData, 2))// [2, 1990, 85, 24, "Vasya", "colya@example.com", "Rafshan", "ashan@example.com", true, false]
console.log(array_skip_until(Datas.testData, "Rafshan")) // ["Rafshan", "ashan@example.com", true, false]
console.log(array_skip_until(Datas.testData, "asd")) // []
*/


// 9. Создать функцию которая нормализует данные в массиве исключая или преобразуя не подходящие.
//Посмотрел примеры, не понял


/*
10. Сделать функцию которая возвращает уникальные элементы массива.
    Синтаксис: array_unique(arr: array): any[]
*/

const array_unique = (arr) => {
    if (!Array.isArray(arr)) throw new TypeError("Not arrray")
    return [...new Set(arr)]
}

// console.log(array_unique(Datas.testData.concat(Datas.testData2)))


/*
11. Сделать функцию которая сможет делать срез данных с ассоциативного массива.
    Синтаксис: array_pluck(arr: array, path: string): any[]
*/

const array_pluck = (arr, string) => {
    if (!Array.isArray(arr)) throw new TypeError("Not arrray")
    const patterns = string.split('.')
    return arr.map((el) => {
        let returnData = el
        for (const pattern of patterns) {
            returnData = returnData[pattern]
        }
        return returnData
    })
}

// console.log(array_pluck(Datas.testData3, 'name'))
// console.log(array_pluck(Datas.testData3, 'skills.php'))


/*12. Создать функцию которая создает объект на основании двух представленных массивов используя один как ключи, а другой как значения. Не подходящие ключи массивов должны быть исключены.
    Синтаксис: array_combine(keys: array, values: array): Object
*/

const array_combine = (keysArr, valuesArr) => {
    keysArr = keysArr.slice(0, valuesArr.length)
    const wrongIndexex = keysArr.map((el, i) => {
        if (el instanceof Object && !Array.isArray(el)) {
            return i
        }
    }).filter((el) => {
        if (el !== undefined) {
            return true
        }
    })
    const filtredFunc = (el, i, _) => {
        if (!wrongIndexex.includes(i)) {
            return true
        }
    }
    const filteredKeysArr = keysArr.filter(filtredFunc)
    const filteredValuesArr = valuesArr.filter(filtredFunc)
    const result = {}
    for (let i = 0; i < filteredKeysArr.length; i++) {
        result[filteredKeysArr[i]] = filteredValuesArr[i]
    }
    return result
}

// console.log(array_combine(Datas.testData, Datas.testData2)) // {1: 1, 2: 2, 1990: 1990, 85: 85, 24: 24, "Vasya": 5, "colya@example.com": 7, "Rafshan": 8.1, "ashan@example.com": undefined}
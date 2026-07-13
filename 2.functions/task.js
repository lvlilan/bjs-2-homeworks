function getArrayParams(...arr) {
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        if (current < min) min = current;
        if (current > max) max = current;
        sum += current;
    }
    
    const avg = Number((sum / arr.length).toFixed(2));
    
    return { min, max, avg };
}

function summElementsWorker(...arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, current) => sum + current, 0);
}

function differenceMaxMinWorker(...arr) {
    if (arr.length === 0) return 0;
    return Math.max(...arr) - Math.min(...arr);
}

function differenceEvenOddWorker(...arr) {
    if (arr.length === 0) return 0;
    let sumEvenElement = 0;
    let sumOddElement = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sumEvenElement += arr[i];
        } else {
            sumOddElement += arr[i];
        }
    }
    return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...arr) {
    if (arr.length === 0) return 0;
    let sumEvenElement = 0;
    let countEvenElement = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            sumEvenElement += arr[i];
            countEvenElement++;
        }
    }
    if (countEvenElement === 0) return 0;
    return Number((sumEvenElement / countEvenElement).toFixed(2));
}

function makeWork(arrOfArr, func) {
    let maxWorkerResult = -Infinity;
    for (let i = 0; i < arrOfArr.length; i++) {
        const result = func(...arrOfArr[i]);
        if (result > maxWorkerResult) {
            maxWorkerResult = result;
        }
    }
    return maxWorkerResult;
}
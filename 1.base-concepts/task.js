"use strict";

function solveEquation(a, b, c) {
  let arr = [];

  const d = b ** 2 - 4 * a * c;

    if (d < 0) {
      
    return arr;
  }

    if (d === 0) {
    const root = -b / (2 * a);
    arr.push(root);

    return arr;
  }

    if (d > 0) {
    const sqrtD = Math.sqrt(d);
    const root1 = (-b + sqrtD) / (2 * a);
    const root2 = (-b - sqrtD) / (2 * a);
    arr.push(root1, root2);

    return arr;
  }

  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
    const percentDecimal = percent / 100;
    const loanBody = amount - contribution;
    const monthlyRate = percentDecimal / 12;
    const monthlyPayment = loanBody * (monthlyRate + monthlyRate / ((1 + monthlyRate) ** countMonths - 1));
    const totalPayment = monthlyPayment * countMonths;

    return Math.round(totalPayment * 100) / 100;
  }

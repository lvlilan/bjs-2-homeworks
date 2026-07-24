function parseCount(value) {
  const parsed = Number.parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error("Невалидное значение");
  }
  return parsed;
}

function validateCount(value) {
  try {
    return parseCount(value);
  } catch (error) {
    return error;
  }
}

class Triangle {
  constructor(a, b, c) {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error("Треугольник с такими сторонами не существует");
    }
    this.a = a;
    this.b = b;
    this.c = c;
  }

  get perimeter() {
    return this.a + this.b + this.c;
  }

  get area() {
    const p = this.perimeter / 2;
    const area = Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    return Number(area.toFixed(3));
  }
}

function getTriangle(a, b, c) {
  try {
    return new Triangle(a, b, c);
  } catch (error) {
    return {
      get area() {
        return "Ошибка! Треугольник не существует";
      },
      get perimeter() {
        return "Ошибка! Треугольник не существует";
      }
    };
  }
}

console.log("=== Задача 1. Форматтер чисел ===");

console.log(validateCount("123"));
console.log(validateCount("123.45"));
console.log(validateCount("abc"));
console.log(validateCount(""));
console.log(validateCount("   ")); 

console.log("=== Задача 2. Треугольник ===");

const validTriangle = new Triangle(3, 4, 5);
console.log("Периметр: " + validTriangle.perimeter);
console.log("Площадь: " + validTriangle.area);

const invalidTriangle = getTriangle(1, 1, 10);
console.log("Периметр: " + invalidTriangle.perimeter);
console.log("Площадь: " + invalidTriangle.area);

const triangle2 = getTriangle(5, 5, 5);
console.log("Периметр: " + triangle2.perimeter);
console.log("Площадь: " + triangle2.area);
try {
  const badTriangle = new Triangle(1, 2, 3);
} catch (error) {
  console.log("Ошибка: " + error.message);
}
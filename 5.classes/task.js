class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this._state = 100;
    this.type = null;
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    if (newState < 0) {
      this._state = 0;
    } else if (newState > 100) {
      this._state = 100;
    } else {
      this._state = newState;
    }
  }

  fix() {
    this.state = this._state * 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = "magazine";
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = "book";
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "novel";
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "fantastic";
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = "detective";
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    const foundBook = this.books.find(book => book[type] === value);
    return foundBook || null;
  }

  giveBookByName(bookName) {
    const bookIndex = this.books.findIndex(book => book.name === bookName);
    if (bookIndex === -1) {
      return null;
    }
    const book = this.books[bookIndex];
    this.books.splice(bookIndex, 1);
    return book;
  }
}

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (mark < 2 || mark > 5) {
      return;
    }

    if (!this.marks[subject]) {
      this.marks[subject] = [];
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!this.marks[subject] || this.marks[subject].length === 0) {
      return 0;
    }

    const sum = this.marks[subject].reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks[subject].length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    
    if (subjects.length === 0) {
      return 0;
    }

    const totalAverage = subjects.reduce((acc, subject) => {
      return acc + this.getAverageBySubject(subject);
    }, 0);

    return totalAverage / subjects.length;
  }
}

console.log("=== Тестирование Student ===");
const student = new Student("Олег Никифоров");

student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика");
student.addMark(1, "математика");

console.log(student.getAverageBySubject("физика"));
console.log(student.getAverageBySubject("биология"));
console.log(student.getAverage());
console.log(student.marks);

const student2 = new Student("Анна Иванова");
console.log(student2.getAverage());

student2.addMark(4, "математика");
student2.addMark(5, "математика");
student2.addMark(3, "физика");
console.log(student2.getAverageBySubject("математика"));
console.log(student2.getAverage());

student2.addMark(5, "информатика");
student2.addMark(10, "информатика");
student2.addMark(0, "информатика");
console.log(student2.getAverageBySubject("информатика"));

console.log("=== Тестирование Library ===");

const library = new Library("Городская библиотека №1");
console.log("Библиотека " + library.name + " создана.");

console.log("1. Добавление изданий:");

const magazine = new Magazine("National Geographic", 2023, 80);
const book1 = new Book("Лев Толстой", "Война и мир", 1869, 1300);
const novel1 = new NovelBook("Федор Достоевский", "Преступление и наказание", 1866, 550);
const fantastic1 = new FantasticBook("Артур Кларк", "Космическая одиссея", 1968, 300);
const detective1 = new DetectiveBook("Агата Кристи", "Убийство в Восточном экспрессе", 1934, 250);

library.addBook(magazine);
library.addBook(book1);
library.addBook(novel1);
library.addBook(fantastic1);
library.addBook(detective1);

console.log("Добавлено " + library.books.length + " изданий.");

console.log("2. Поиск книги:");
const foundBook = library.findBookBy("name", "Преступление и наказание");
console.log("Найдена: " + foundBook.name + ", автор: " + foundBook.author);

const notFoundBook = library.findBookBy("name", "Несуществующая книга");
console.log("Поиск несуществующей: " + (notFoundBook === null ? "null" : "найдена"));

console.log("3. Выдача книги:");
const bookToGive = library.giveBookByName("Война и мир");
console.log("Выдана: " + bookToGive.name);
console.log("Осталось книг: " + library.books.length);

const alreadyGiven = library.giveBookByName("Война и мир");
console.log("Попытка выдать выданную: " + (alreadyGiven === null ? "null" : "найдена"));

console.log("4. Повреждение книги:");
const bookToDamage = library.findBookBy("name", "Космическая одиссея");
if (bookToDamage) {
  console.log("Состояние до: " + bookToDamage.state);
  bookToDamage.state = 20;
  console.log("Состояние после: " + bookToDamage.state);
  
  const damagedBook = library.giveBookByName("Космическая одиссея");
  console.log("Можно выдать? " + (damagedBook === null ? "Нет (state <= 30)" : "Да"));
}

console.log("5. Восстановление книги:");
const bookToRepair = library.findBookBy("name", "Космическая одиссея");
if (bookToRepair) {
  console.log("Состояние до: " + bookToRepair.state);
  bookToRepair.fix();
  console.log("Состояние после: " + bookToRepair.state);
  
  const repairedBook = library.giveBookByName("Космическая одиссея");
  console.log("Можно выдать восстановленную? " + (repairedBook !== null ? "Да" : "Нет"));
}

console.log("6. Итоговое состояние:");
console.log("Всего книг: " + library.books.length);
library.books.forEach(book => {
  console.log("- " + book.name + " (" + book.type + "), состояние: " + book.state);
});
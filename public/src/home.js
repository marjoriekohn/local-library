const {partitionBooksByBorrowedStatus, findAuthorById} = require("./books");

const getTotalBooksCount = (books) => books.length;
const getTotalAccountsCount = (accounts) => accounts.length;
const getBooksBorrowedCount = (books) => partitionBooksByBorrowedStatus(books)[0].length;

function getMostCommonGenres(books) {
  const genreCount = books.reduce((allGenres, book) => {
    if (allGenres[book.genre]) {
      allGenres[book.genre] += 1;
    } else {
      allGenres[book.genre] = 1
    }
    return allGenres;
  }, {})
  return Object.entries(genreCount)
    .sort((genreA, genreB) => genreB[1] - genreA[1])
    .map(([name, count]) => ({ name, count }))
    .slice(0, 5)
}

function getMostPopularBooks(books) {
  return books.map((book) => ({
    name: book.title,
    count: getBorrowCount(book),
  }))
    .sort((bookA, bookB) => bookB.count - bookA.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const allAuthors = {};

  books.forEach((book) => {
    const author = findAuthorById(authors, book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    if (allAuthors[authorName]) {
      allAuthors[authorName] += getBorrowCount(book);
    } else {
      allAuthors[authorName] = getBorrowCount(book);
    }
  }, {})

  return Object.entries(allAuthors)
    .map(([name, count]) => ({ name, count }))
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5)
}

// helper functions
const getBorrowCount = (book) => book.borrows.length;

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

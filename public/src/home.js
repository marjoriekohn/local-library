const {partitionBooksByBorrowedStatus, findById} = require("./books");

const getTotalBooksCount = (books) => books.length;
const getTotalAccountsCount = (accounts) => accounts.length;
const getBooksBorrowedCount = (books) => partitionBooksByBorrowedStatus(books)[0].length;

function getMostCommonGenres(books) {
  const genreCount = countByProperty(books, 'genre'); // returns object
  const commonGenres = Object.entries(genreCount).map(([name, count]) => ({ name, count })) // array
  return sortAndSliceTopFive(commonGenres, 'count'); // returns array
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: getBorrowCount(book),
  }))
  return sortAndSliceTopFive(popularBooks, 'count');
}

function getMostPopularAuthors(books, authors) {
  const bookBorrowCount = books.map((book) => ({borrowCount: getBorrowCount(book), ...book})); // add borrowCount property to books
  const authorBorrowCount = bookBorrowCount.reduce((total, {authorId, borrowCount}) => { // destructure book properties - returns object
    total.hasOwnProperty(authorId) ? total[authorId] += borrowCount : total[authorId] = borrowCount; // hold total borrow counts
    return total;
  }, {});
  const topAuthors = Object.entries(authorBorrowCount).map(([id, count]) => { // map to correct format
    const { name:{first, last}} = findById(authors, Number(id)); // author full name
    return { name: `${first} ${last}`, count };
  })
  return sortAndSliceTopFive(topAuthors, 'count');
}

// helper functions
const getBorrowCount = (book) => book.borrows.length;
const sortAndSliceTopFive = (array, key) => array.sort((itemA, itemB) => itemB[key] - itemA[key]).slice(0, 5);
const countByProperty = (array, property) => { // returns number of occurrences
  return array.reduce((total, item) => {
    const key = item[property];
    total[key] ? total[key] += 1 : total[key] = 1;
    return total;
  }, {})
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

const findAuthorById = (authors, id) => findById(authors, id);
const findBookById = (books, id) => findById(books, id);

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const returnedBooks = books.filter(book => book.borrows[0].returned);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map((borrow) => {
    const account = findById(accounts, borrow.id);
    return { ...account, returned: borrow.returned };
  }).slice(0, 10);
}

// helper function - findById
function findById(objects, id) {
  return objects.find((object) => object.id === id);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};


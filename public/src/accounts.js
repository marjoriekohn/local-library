function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1;
  })
}

function getTotalNumberOfBorrows(account, books) { // return number of books borrowed - borrowing 1 book 10 times = 1 
  return books.reduce((total, book) => {
    if (book.borrows.some((borrow) => borrow.id === account.id)) {
      total += 1
    }
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.filter((book) =>
    book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned)
  ).map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {...book, author};
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
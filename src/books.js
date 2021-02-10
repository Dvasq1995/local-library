function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returned = books.filter((book) => book.borrows[0].returned === true);
  const notReturned = books.filter(
    (book) => book.borrows[0].returned === false,
  );
  return [[...notReturned], [...returned]];
}

function getBorrowersForBook(book, accounts) {
  const accountList = accounts.map((account) => {
    if (book.borrows.find((borrow) => borrow.id === account.id)) {
      account.returned = true;
    } else {
      account.returned = false;
    }
    return account;
  });
  return accountList.filter((borrower) => borrower.returned === true);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

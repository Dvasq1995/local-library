function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) =>
    acc1.name.last.toLowerCase() < acc2.name.last.toLowerCase() ? -1 : 1,
  );
}

function numberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    acc += book.borrows.filter((item) => item.id === account.id).length;
    return acc;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const bookList = books.map((book) => {
    book.author = authors.find((author) => author.id === book.authorId);
    return book;
  });

  return bookList.filter((item) =>
    item.borrows.find(
      (borrow) => borrow.id === account.id && borrow.returned === false,
    ),
  );
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};

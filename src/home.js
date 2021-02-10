function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (book.borrows[0].returned === false) {
      acc += 1;
    }
    return acc;
  }, 0);
}

function getUniquePropsCount(obj, prop) {
  const uniqueProps = [...new Set(obj.map((object) => object[prop]))];
  const uniqueCounts = uniqueProps.map((property) => ({
    name: property,
  }));

  return uniqueCounts;
}

function topFive(obj) {
  return obj
    .sort((item1, item2) => {
      if (item1.count > item2.count) {
        return -1;
      }
      return 1;
    })
    .slice(0, 5);
}

function getMostCommonGenres(books) {
  const genreCounts = getUniquePropsCount(books, 'genre').map((genre) => {
    genre.count = books.reduce((acc, book) => {
      if (book.genre === genre.name) {
        acc += 1;
      }
      return acc;
    }, 0);
    return genre;
  });

  return topFive(genreCounts);
}

function getMostPopularBooks(books) {
  const bookList = getUniquePropsCount(books, 'title').map((title) => {
    title.count = books.reduce((acc, book) => {
      if (book.title === title.name) {
        acc += book.borrows.length;
      }
      return acc;
    }, 0);
    return title;
  });
  return topFive(bookList);
}

function getMostPopularAuthors(books, authors) {
  const authorList = authors.map(({ name, id }) => ({
    name: `${name.first} ${name.last}`,
    count: books.reduce((acc, book) => {
      if (book.authorId === id) {
        acc += book.borrows.length;
      }
      return acc;
    }, 0),
  }));
  return topFive(authorList);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

const router = require("express").Router();
const books = require("./books");

var booksDirectory = books;

router.get("/books", (req, res) => {
  res.send(booksDirectory);
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;

  const book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book does not exist");

  res.send(book);
});

router.post("/books", (req, res) => {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const bookExists = booksDirectory.find((b) => b.isbn === isbn);
  if (bookExists) return res.send("Book already exists");
  const book = {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  };
  booksDirectory.push(book);
  res.send(book);
});

router.put("/books/:id", (req, res) => {
  // First find the book
  const { id } = req.params;

  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book does not exist");

  const updateField = (val, prev) => (!val ? prev : val);

  const updatedBook = {
    ...book,
    title: updateField(title, book.title),
    isbn: updateField(isbn, book.isbn),
    pageCount: updateField(pageCount, book.pageCount),
    publishedDate: updateField(publishedDate, book.publishedDate),
    thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
    shortDescription: updateField(shortDescription, book.shortDescription),
    longDescription: updateField(longDescription, book.longDescription),
    status: updateField(status, book.status),
    authors: updateField(authors, book.authors),
    categories: updateField(categories, book.categories),
  };
  res.send(updatedBook);

  const bookIndex = booksDirectory.findIndex((b) => b.isbn === id);
  console.log(bookIndex);
  booksDirectory[bookIndex] = updatedBook;
});

router.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book does not exist");
  booksDirectory = booksDirectory.filter((b) => b.isbn !== id);
  res.send("Success");
});

module.exports.router = router;

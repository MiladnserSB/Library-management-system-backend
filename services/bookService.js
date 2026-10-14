import Book from "../models/BookModel.js";

export const getAllBooks = async () => {
  return await Book.find().sort({createdAt: -1});
};

export const getAvailableBooks = async () => {
  return await Book.find({ bookStatus: "available" });
};

export const createBook = async (data) => {
  return await Book.create(data);
};

export const updateBook = async (id, data) => {
  return await Book.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBook = async (id) => {
  const book = await Book.findById(id);
  if (!book) throw new Error("Book not found");
  if (book.bookStatus === "borrowed") throw new Error("Cant delete borrowed book");
  return await Book.findByIdAndDelete(id);
};




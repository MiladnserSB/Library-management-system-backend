import Book from "../models/BookModel.js";

export const getAllBooks = async () => {
  try {
    return await Book.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error getting all books:", error);
    throw error;
  }
};

export const getAvailableBooks = async () => {
  try {
    return await Book.find({ bookStatus: "available" });
  } catch (error) {
    console.error("Error getting available books:", error);
    throw error;
  }
};

export const createBook = async (data) => {
  try {
    return await Book.create(data);
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const updateBook = async (id, data) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) throw new Error("Book not found");
    return updatedBook;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const book = await Book.findById(id);
    if (!book) throw new Error("Book not found");
    if (book.bookStatus === "borrowed")
      throw new Error("Cant delete borrowed book");
    return await Book.findByIdAndDelete(id);
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    return await Book.findById(id);
  } catch (error) {
    console.error(`Error getting book with id ${id}:`, error);
    throw error;
  }
};

export const changeBookStatus = async (id, status) => {
  try {
    const book = await Book.findById(id);
    if (!book) throw new Error("Book not found");
    book.bookStatus = status;
    return await book.save();
  } catch (error) {
    console.error(`Error changing status for book with id ${id}:`, error);
    throw error;
  }
};

/* import Borrower from "../models/BorrowerModel.js";
import * as bookService from "./bookService.js";

export const getAllBorrowers = async () => {
  try {
    return await Borrower.find().populate(
      "bookId",
      "bookTitle bookAuthor -_id",
    );
  } catch (error) {
    console.error("Error retrieving borrowers:", error);
    return null;
  }
};

export const getBorrowerById = async (borrowerId) => {
  try {
    return await Borrower.findById(borrowerId).populate(
      "bookId",
      "bookTitle bookAuthor -_id",
    );
  } catch (error) {
    console.error(`Error retrieving borrower with ID ${borrowerId}:`, error);
    return null;
  }
};

export const createBorrower = async (borrowerData) => {
  try {
    const book = await bookService.getBookById(borrowerData.bookId);

    if (!book || book.status === "Borrowed") {
      console.error("Book is not available or does not exist");
      return null;
    }

    const newBorrower = await Borrower.create(borrowerData);

    await bookService.changeBookStatus(borrowerData.bookId, "Borrowed");

    return newBorrower;
  } catch (error) {
    console.error(`Error creating borrower with data ${borrowerData}:`, error);
    return null;
  }
};

export const updateBorrower = async (id, borrowerData) => {
  try {
    const borrower = await Borrower.findById(id);
    if (!borrower) return null;

    if (borrower.returnDate) {
      console.error("Book is already returned");
      return null;
    }

    borrower.returnDate = Date.now();
    if (borrowerData.borrowerName) {
      borrower.borrowerName = borrowerData.borrowerName;
    }

    await bookService.changeBookStatus(borrower.bookId, "Available");

    await borrower.save();
    return borrower;
  } catch (error) {
    console.error(`Error updating borrower with id ${id}:`, error);
    return null;
  }
};

export const deleteBorrower = async (id) => {
  try {
    const borrower = await Borrower.findById(id);
    if (!borrower) return null;

    if (!borrower.returnDate) {
      console.error("Cannot delete borrower: Book not returned yet");
      return null;
    }

    const deletedBorrower = await Borrower.findByIdAndDelete(id);
    return deletedBorrower;
  } catch (error) {
    console.error(`Error deleting borrower with id ${id}:`, error);
    return null;
  }
};
 */


import Borrower from "../models/BorrowerModel.js";
import * as bookService from "./bookService.js";

// Get all borrowing records, including book information
export const getAllBorrowers = async () => {
  return await Borrower.find()
    .populate("bookId", "title author status")
    .sort({ createdAt: -1 });
};

// Get one borrowing record
export const getBorrowerById = async (borrowerId) => {
  return await Borrower.findById(borrowerId)
    .populate("bookId", "title author status");
};

// Borrow a book
export const createBorrower = async (borrowerData) => {
  const book = await bookService.getBookById(borrowerData.bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  if (book.status !== "Available") {
    throw new Error("Book is not available or is already borrowed");
  }

  // Create the borrowing record
  const newBorrower = await Borrower.create({
    borrowerName: borrowerData.borrowerName,
    borrowDate: borrowerData.borrowDate ?? new Date(),
    expectedReturnDate: borrowerData.expectedReturnDate,
    bookId: book._id,
    returnedAt: null,
  });

  try {
    // Mark the book as borrowed
    await bookService.changeBookStatus(book._id, "Borrowed");
  } catch (error) {
    // Avoid leaving a borrowing record if status update fails
    await Borrower.findByIdAndDelete(newBorrower._id);
    throw error;
  }

  return newBorrower;
};

// Return a borrowed book
export const updateBorrower = async (id, borrowerData) => {
  const borrower = await Borrower.findById(id);

  if (!borrower) {
    throw new Error("Borrower not found");
  }

  if (borrower.returnedAt) {
    throw new Error("This book has already been returned");
  }

  if (borrowerData.borrowerName) {
    borrower.borrowerName = borrowerData.borrowerName;
  }

  // Record the actual return date
  borrower.returnedAt = new Date();

  await borrower.save();

  // Mark the book as available again
  await bookService.changeBookStatus(borrower.bookId, "Available");

  return borrower;
};

// Delete a borrowing record only after the book is returned
export const deleteBorrower = async (id) => {
  const borrower = await Borrower.findById(id);

  if (!borrower) {
    throw new Error("Borrower not found");
  }

  if (!borrower.returnedAt) {
    throw new Error("Cannot delete a borrowing record before returning the book");
  }

  return await Borrower.findByIdAndDelete(id);
};

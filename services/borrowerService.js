import Borrower from "../models/BorrowerModel.js";
import * as bookService from "./bookService.js";

export const getAllBorrowers = async () => {
  try {
    return await Borrower.find().populate("bookId", "title author -_id");
  } catch (error) {
    console.error("Error retrieving borrowers:", error);
    return null;
  }
};

export const getBorrowerById = async (borrowerId) => {
  try {
    return await Borrower.findById(borrowerId).populate(
      "bookId",
      "title author -_id",
    );
  } catch (error) {
    console.error(`Error retrieving borrower with ID ${borrowerId}:`, error);
    return null;
  }
};

export const createBorrower = async (borrowerData) => {
  try {
    const book = await bookService.getBookById(borrowerData.bookId);

    if (!book || book.bookStatus === "borrowed") {
      console.error("Book is not available or does not exist");
      return null;
    }

        const newBorrower = await Borrower.create(borrowerData);

    await bookService.changeBookStatus(borrowerData.bookId, "borrowed");

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

    await bookService.changeBookStatus(borrower.bookId, "available");

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

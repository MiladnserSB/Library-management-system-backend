import Borrower from "../models/BorrowerModel.js";

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
    const newBorrower = await Borrower.create(borrowerData);
    return newBorrower;
  } catch (error) {
    console.error(`Error creating borrower with data ${borrowerData}:`, error);
  }
};

export const updateBorrower = async (id, borrowerData) => {
  try {
    const updatedBorrower = await Borrower.findByIdAndUpdate(id, borrowerData, {
      new: true,
    });

    return updatedBorrower;
  } catch (error) {
    console.error(`Error updating borrower with id ${id}:`, error);
    return null;
  }
};

export const deleteBorrower = async (id) => {
  try {
    const deletedBorrower = await Borrower.findByIdAndDelete(id);
    return deletedBorrower;
  } catch (error) {
    console.error(`Error deleting borrower with id ${id}:`, error);
    return null;
  }
};

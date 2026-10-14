import Borrower from "../models/BorrowerModel";

export const getAllBorrowers = async () => {
  try {
    return await Borrower.find().populate("bookId", "title author -_id");
  } catch (error) {
    console.error("Error retrieving borrowers:", error);
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
    const updatedBorrower = await Borrower.findByIdAndUpdate(id, borrowerData);

    return updatedBorrower;
  } catch (error) {
    console.error(`Error updating borrower with id ${id}:`, error);
    throw error;
  }
};

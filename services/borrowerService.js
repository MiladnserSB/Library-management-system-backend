import Borrower from "../models/BorrowerModel";

const getAllBorrowers = async () => {
  try {
    return await Borrower.find().populate("bookId", "title author -_id");
  } catch (error) {
    console.error("Error retrieving borrowers:", error);
  }
};

const getBorrowerById = async (borrowerId) => {
  try {
    return await Borrower.findById(borrowerId).populate(
      "bookId",
      "title author -_id",
    );
  } catch (error) {
    console.error(`Error retrieving borrower with ID ${borrowerId}:`, error);
  }
};



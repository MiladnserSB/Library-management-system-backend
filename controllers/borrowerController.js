import {
  getAllBorrowers,
  createBorrower,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} from "../services/borrowerService.js";

export const getAllBorrowersController = async (req, res) => {
  try {
    const borrowers = await getAllBorrowers();
    res.status(200).json(borrowers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getBorrowerByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const borrower = await getBorrowerById(id);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }
    res.status(200).json(borrower);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createBorrowerController = async (req, res) => {
  try {
    const borrowerData = req.body;
    const newBorrower = await createBorrower(borrowerData);
    if (!newBorrower) {
      return res
        .status(400)
        .json({ message: "Book is not available or already borrowed" });
    }
    res.status(201).json(newBorrower);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateBorrowerController = async (req, res) => {
  try {
    const id = req.params.id;
    const borrowerData = req.body;
    const updatedBorrower = await updateBorrower(id, borrowerData);
    if (!updatedBorrower) {
      return res
        .status(400)
        .json({
          message: "Cannot update: Book already returned or borrower not found",
        });
    }
    res.status(200).json(updatedBorrower);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteBorrowerController = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBorrower = await deleteBorrower(id);
    if (!deletedBorrower) {
      return res
        .status(400)
        .json({
          message: "Cannot delete: Book not returned yet or borrower not found",
        });
    }
    res
      .status(200)
      .json({ message: "Borrower deleted successfully", deletedBorrower });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

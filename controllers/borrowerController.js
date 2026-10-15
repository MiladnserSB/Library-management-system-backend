/* import {
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
 */

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBorrowerByIdController = async (req, res) => {
  try {
    const borrower = await getBorrowerById(req.params.id);

    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found" });
    }

    res.status(200).json(borrower);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBorrowerController = async (req, res) => {
  try {
    const newBorrower = await createBorrower(req.body);
    res.status(201).json(newBorrower);
  } catch (error) {
    const status = error.message === "Book not found" ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

export const updateBorrowerController = async (req, res) => {
  try {
    const updatedBorrower = await updateBorrower(req.params.id, req.body);

    res.status(200).json(updatedBorrower);
  } catch (error) {
    const status = error.message === "Borrower not found" ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

export const deleteBorrowerController = async (req, res) => {
  try {
    const deletedBorrower = await deleteBorrower(req.params.id);

    res.status(200).json({
      message: "Borrower deleted successfully",
      deletedBorrower,
    });
  } catch (error) {
    const status = error.message === "Borrower not found" ? 404 : 400;
    res.status(status).json({ message: error.message });
  }
};

import * as borrowerService from "../services/borrowerService.js";

export const updateExpectedReturnDateController = async (req, res) => {
  try {
    const updatedBorrower = await borrowerService.updateExpectedReturnDate(
      req.params.id,
      req.body.expectedReturnDate
    );

    return res.status(200).json(updatedBorrower);
  } catch (error) {
    const status = error.message === "Borrowing record not found" ? 404 : 400;

    return res.status(status).json({
      message: error.message || "Failed to update expected return date",
    });
  }
};

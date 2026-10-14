import {
  getAllBorrowers,
  createBorrower,
  getBorrowerById,
  updateBorrower,
} from "../services/borrowerService.js";

export const getAllBorrowersController = async (req, res) => {
  res.json(getAllBorrowers());
};

export const getBorrowerByIdController = async (req, res) => {
  const id = req.params.id;
  res.json(getBorrowerById(id));
};

export const createBorrowerController = async (req, res) => {
  const borrowerData = req.body;
  res.json(createBorrower(borrowerData));
};

export const updateBorrowerController = async (req, res) => {
  const id = req.params.id;
  const borrowerData = req.body;
  res.json(updateBorrower(borrowerData));
};

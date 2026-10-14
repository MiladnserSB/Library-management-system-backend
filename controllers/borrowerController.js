import {
  getAllBorrowers,
  createBorrower,
  getBorrowerById,
  updateBorrower,
  deleteBorrower,
} from "../services/borrowerService.js";

export const getAllBorrowersController = async (req, res) => {
  res.json(await getAllBorrowers());
};

export const getBorrowerByIdController = async (req, res) => {
  const id = req.params.id;
  res.json(await getBorrowerById(id));
};

export const createBorrowerController = async (req, res) => {
  const borrowerData = req.body;
  res.json(await createBorrower(borrowerData));
};

export const updateBorrowerController = async (req, res) => {
  const id = req.params.id;
  const borrowerData = req.body;
  res.json(await updateBorrower(id, borrowerData));
};

export const deleteBorrowerController = async (req, res) => {
  const id = req.params.id;
  res.json(await deleteBorrower(id));
};
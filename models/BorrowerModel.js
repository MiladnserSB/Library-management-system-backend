/* import mongoose from "mongoose";

const borrowerSchema = new mongoose.Schema(
  {
    borrowerName: { type: String, required: true, trim: true },
    borrowerDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true },
);

const Borrower = mongoose.model("Borrower", borrowerSchema);
export default Borrower;
 */

import mongoose from "mongoose";

const borrowerSchema = new mongoose.Schema(
  {
    borrowerName: {
      type: String,
      required: true,
      trim: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    expectedReturnDate: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
      default: null,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
  },
  { timestamps: true }
);

const Borrower = mongoose.model("Borrower", borrowerSchema);

export default Borrower;

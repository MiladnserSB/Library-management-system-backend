import mongoose from "mongoose";

const borrowerSchema = new mongoose.Schema(
  {
    borrowerName: { type: String, required: true, trim: true },
    borrowDate: {
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

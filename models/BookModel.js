import mongoose from "mongoose";
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookTitle: { type: String, required: true, trim: true },
    bookAuthor: { type: String, required: true, trim: true },
    bookStatus: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);
export default Book;

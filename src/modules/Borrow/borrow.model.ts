import mongoose, { Schema, Types } from "mongoose";
import { IBorrow, IBorrowStaticMethod } from "./borrow.interface";
import { BookModel } from "../Book/book.models";

const borrowSchema = new Schema<IBorrow, IBorrowStaticMethod>(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.static(
  "borrowLogic",
  async function (bookId: Types.ObjectId, quantity: number) {
    const book = await BookModel.findById(bookId);
    if (!book) throw new Error("Book Not found");
    if (book.copies < quantity) throw new Error("Book is Not Available");
    book.copies -= quantity
    if (book.copies === 0) {
      book.available = false;
    }
    await book.save();
  }
);

export const BorrowModel = mongoose.model<IBorrow, IBorrowStaticMethod>(
  "Borrow",
  borrowSchema
);

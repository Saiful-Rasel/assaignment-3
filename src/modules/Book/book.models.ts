import mongoose, { model } from "mongoose";
import { IBook } from "./book.interface";

const BookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    enum: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
       "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ],
    default:"FICTION"
  },
  isbn: { type: String, required: true,unique:true },
  description: { type: String},
  copies: { type: Number, required: true },
  available: { type: Boolean, default:true },
},{

  versionKey:false,
  timestamps:true
});


 export const BookModel = model("Book",BookSchema)
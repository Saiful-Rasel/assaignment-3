import { NextFunction, Request, Response } from "express";
import { createBorrowZodSchema } from "./borrow.validation";
import { BorrowModel } from "./borrow.model";
import mongoose from "mongoose";

export const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const zodValidation = await createBorrowZodSchema.parseAsync(req.body);
    const bookId = new mongoose.Types.ObjectId(zodValidation.book);
    await BorrowModel.borrowLogic(bookId, zodValidation.quantity);
    const createdData = await BorrowModel.create(zodValidation);

    res.json({
      success: true,
      message: "Borrow created successfully",
      data: createdData,
    });
  } catch (error) {
    next(error);
  }
};

export const borrowSummary  = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summary = await BorrowModel.aggregate([
      {
        $group: {
          _id: "$book", 
          totalQuantity: { $sum: "$quantity" }, 
        },
      },
      {
        $lookup: {
          from: "books", 
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
     {
        $project: {
          _id: 0,
          book: "$bookDetails._id",
          title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });

 
  } catch (error) {
    next(error);
  }
};

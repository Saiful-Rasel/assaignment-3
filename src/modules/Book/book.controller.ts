import { NextFunction, Request, Response } from "express";
import { createBookZodSchema } from "./book.validation";
import { BookModel } from "./book.models";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const zodValidation = await createBookZodSchema.parseAsync({
      body: req.body,
    });

    const createData = await BookModel.create(zodValidation.body);
    res.json({
      success: true,
      message: "Book Created Successfully",
      data: createData,
    });
  } catch (error: any) {
    next(error);
  }
};

// get all Book
export const getAllBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { genre, sortBy, sort, limit } = req.query;
    const query: Record<string, any> = {};
    if (genre) {
      query.genre = genre;
    }

    const books = await BookModel.find(query)
      .sort({ [sortBy as string]: sort === "desc" ? -1 : 1 })
      .limit(Number(limit));
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// single book
export const getSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const singleBook = await BookModel.findById(bookId);

    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: singleBook,
    });
  } catch (error :any) {
    next(error);
  }
};



// update book
export const updateSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const updatedData = await BookModel.findByIdAndUpdate(bookId, body, {
      new: true,
    });

    res.json({
      success: true,
      message: "Book updated successfully",
      data: updatedData,
    });
  } catch (error :any) {
    next(error);
  }
};

// delete single book
export const deleteSingleBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;
    const deleteBook = await BookModel.findByIdAndDelete(bookId);

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: deleteBook,
    });
  } catch (error : any) {
    next(error);
  }
};

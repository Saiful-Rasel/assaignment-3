import express from "express"
import { createBook, deleteSingleBook, getAllBook, getSingleBook, updateSingleBook } from "./book.controller"

 export const bookRoute = express.Router()

 bookRoute.post('/', createBook)
 bookRoute.get('/' ,getAllBook)
 bookRoute.get('/:bookId',getSingleBook)
 bookRoute.patch('/:bookId' , updateSingleBook)
 bookRoute.delete('/:bookId', deleteSingleBook)
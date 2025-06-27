import { Application, ErrorRequestHandler, Request, Response } from "express";
import express from "express"
import { bookRoute } from "./modules/Book/book.route";
import zodErrorHandler from "./middleware/zodErrorHandler";
import { borrowRoute } from "./modules/Borrow/borrow.route";



const app:Application = express()
app.use(express.json())

app.use('/api/books',bookRoute)
app.use('/api/borrow',borrowRoute)

//error handler  middleware 
app.use(zodErrorHandler as ErrorRequestHandler );


app.get("/", (req: Request, res: Response) => {
  res.send("Assignment_3");
});

export default app;
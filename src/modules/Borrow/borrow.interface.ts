import { Model, Types } from "mongoose";

export interface IBorrow {
    book:Types.ObjectId;
    quantity:number;
    dueDate:Date
}

export interface IBorrowStaticMethod extends Model<IBorrow> {
    borrowLogic(book : Types.ObjectId,quantity:number) : Promise<void>
}
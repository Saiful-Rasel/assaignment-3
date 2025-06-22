
import app from "./app";
import mongoose from "mongoose";

import { mongodb_uri, port } from "./config";

async function Server() {
  try {
    await mongoose.connect(mongodb_uri as string);
    console.log("connected");
    app.listen(port, () => {
      console.log(` app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

Server();



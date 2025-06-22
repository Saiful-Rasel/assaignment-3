import dotenv from "dotenv"

dotenv.config()

const mongodb_uri = process.env.MONGODB_URL;
const port = process.env.PORT;

export {
    mongodb_uri ,
    port
}
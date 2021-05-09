import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    const db = mongoose.connection;

    db.on("error", (err) => {
      console.error.bind(console, "connection error:");
      reject(
        new Error("An error has occured on database connection %s", err.message)
      );
    });
    db.once("open", () => {
      resolve("Successfull database connection");
    });
  });

export default dbConnection;

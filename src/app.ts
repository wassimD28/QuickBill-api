import express from "express";
import sequelize from "./config/database";
import { errorHandler , notFound } from "./middleware/errorHandler.middleware";
import path from "path";
import cors from "cors";
// import routes

// Import setupAssociations
import setupAssociations from "./models/setupAssociations";
import { createServer } from "http";


const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors()); // to let the front-end access the api

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Setup database and associations
const initializeDatabase = async () => {
  try {
    // Set up model associations
    setupAssociations(); //! setup model associations should be always done at this point

    // Sync database
    await sequelize.sync();
    console.log("Database connected and models synchronized");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit process with failure
  }
};

// Initialize database
initializeDatabase();

// routes


// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default httpServer;

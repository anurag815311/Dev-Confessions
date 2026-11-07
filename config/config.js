require("dotenv").config();

const VALID_CATEGORIES = [
  "bug",
  "deadline",
  "imposter",
  "vibe-code",
];

const PORT = process.env.PORT || 3000;
const DELETE_TOKEN = process.env.DELETE_TOKEN;

if (!DELETE_TOKEN) {
  throw new Error("DELETE_TOKEN is missing. Please configure it in your .env file.");
}

module.exports = {
  VALID_CATEGORIES,
  PORT,
  DELETE_TOKEN,
};
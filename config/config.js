require("dotenv").config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  cloudinary: {
    cloud_name: process.env.CLUDE_NAME,
    api_key: process.env.CLUDE_API_KEY,
    api_secret: process.env.CLUDE_API_SECRET
}
};

require("dotenv").config();

module.exports = {
  s3: {
    endpoint_url: process.env.ENDPOINT,
    access_key: process.env.ACCESS_KEY,
    secret_key: process.env.SECRET_KEY,
    bucket: process.env.BUCKET,
  },
  IP:process.env.IP,
  api_secret: process.env.JWT_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  PORT: process.env.PORT,
  hrmsDb:{
    host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
  }
};

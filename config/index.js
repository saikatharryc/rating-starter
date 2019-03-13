const config = {
  MONGO: {
    URI:
      process.env.MONGO_URL ||
      "mongodb://saikatharryc:saikat95@ds337985.mlab.com:37985/casa",
    OPTIONS: { useNewUrlParser: true }
  },
  JWT: {
    secret: process.env.SECRET || "uyg2hx3ub3iuzoxuo",
    expire: 3600
  }
};
Object.freeze(config);
module.exports = config;

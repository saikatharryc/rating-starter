const config = {
  MONGO: {
    URI:
      process.env.MONGO_URL ||
      "mongodb://<admin>:<password>@<host>:<port>/<db name | default admin>",
    OPTIONS: { useNewUrlParser: true }
  },
  JWT: {
    secret: "uyg2hx3ub3iuzoxuo",
    expire: 3600
  }
};
Object.freeze(config);
module.exports = config;

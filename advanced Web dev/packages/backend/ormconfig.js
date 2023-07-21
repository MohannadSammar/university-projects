
const prefix = (path) => {
    let prefix = null;
    switch (process.env.NODE_ENV) {
      // ts-jest registers ts-node
      case "test":
        prefix = "./src";
        break;
      // development uses tsc-watch now
      case "development":
        prefix = "./dist/src";
        break;
      case "production":
      default:
        prefix = "./dist/src";
        break;
    }
    return `${prefix}/${path}`;
  };
  
const config = {
    type: 'mysql',
    host: process.env.DBHOST || 'localhost',
    port: process.env.DBPORT || '3306',
    username: process.env.DBUSER || 'root',
    database: process.env.DBNAME || 'tech-tinder-db',
    password: process.env.DBPASSWORD,
    // synchronize: true,
    logging: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: [prefix("entity/*{.ts,.js}")],
    cli: {
      "entitiesDir": "src/entity"
    }
};
module.exports = config;

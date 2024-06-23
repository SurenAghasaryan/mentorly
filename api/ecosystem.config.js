module.exports = {
    apps: [
      {
        name: 'api',
        script: 'server.js',
        instances: 'max',
        watch: false,
        env: {
          NODE_ENV: 'development',
          DB_HOST: 'mentorly-db',
          DB_USER: 'postgres',
          DB_PASSWORD: 'pswd',
          DB_NAME: 'mentorly-dev-db',
          DB_DIALECT: 'postgres',
          DB_PORT: 5432,
        },
        env_production: {
          NODE_ENV: 'production',
        }
      }
    ]
  };
  
'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/budgie_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/budgie_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

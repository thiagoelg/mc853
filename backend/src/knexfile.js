module.exports = {
  production: {
    client: 'postgresql',
    connection: {
      database: 'responsive'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
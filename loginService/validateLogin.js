
const DB = {
  betuca: '12345',
  carmen: '1122',
  andrea: 'harry'
}

const validateLogin = (login, password) => {
  return DB[login] === password;
}

module.exports = { validateLogin };
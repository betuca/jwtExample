
const DB = {
  betuca: '12345',
  maria: '11111',
  pepe: '22222'
};

const validateLogin = (login, password) => {
  console.log("> chekcing login and passowrd in DB");
  return DB[login] === password;
};

module.exports = { validateLogin };

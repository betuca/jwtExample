- main overview of the development plan
- show branch clean-version
- on first service
  - create /load endpoint
  - show result on postman
  
```
app.get("/load", (req, res) => {
  res.json({message: "load endpoint"})
})
```

- on login service
  - create /login endpoint
  - show result on postman

```
app.post("/login", (req, res) => {
  res.json({message : "login endpoint"})
})
```

- on login service
  - modify login to receive login and password
  - add require for body parser
  - add app use for body parser
  - get login and passowrd from body
  - return or log to check result
  - check on postman

```

const bodyParser = require("body-parser");


app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

  console.log("body: ", req.body);
  const login = req.body.login;
  const password = req.body.password;

  res.json({message : "login endpoint for: " + login})

{
    "login": "betuca",
    "password": "12345"
}

```

- on login service
  - create a new file: validateLogin.js
  - create a function validateLogin return false
  - set module export

```
const validateLogin = (login, password) => {
  return false;
}

module.exports = { validateLogin };
```

  - add require to app
  - add if to use function
  - test from postmant
```
const { validateLogin } = require("./validateLogin")

  if (!validateLogin(login, password)){
    res.sendStatus(401);
  }

```
  
  - create a "DB" const and use it to "validate"
  - test with different logins from postman

- on login service for the JWT sign
  - create a file "jwtSign"
  - create function that receives a user and return the token

```
const jwtSign = (user) => {
  const token = "";
  return token;
}

module.exports = { jwtSign };
```

  - we will need this modules:

```
const jwt  = require('jsonwebtoken');
```
  - the function need this parameters:

```
  //  jwt.sign(payload, privateKey, signOptions);
```

  - for the sign in options

```
const signOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: "RS256"
};
```

  - lets create the keys
  - https://travistidwell.com/jsencrypt/demo/
  - (2048 bit key size - Asymetric!)
  - add the key in file /screts/private.key

  - to read the key we will use a module
```
const fs   = require('fs');

const privateKey = fs.readFileSync('./secrets/private.key', 'utf8');

```

  - access the login endpoint end test token
  - https://jwt.io/


- on first service
  - lets get and use the jwt
  - first we need to call the login
  - lets use axios to do that

```
const axios = require("axios");

const LOCAL_HOST = "http://localhost";
const LOGIN_HOST = LOCAL_HOST + ":5000";
const USER_HOST = LOCAL_HOST + ":5002";

EX:
  axios.post(LOGIN_HOST + '/login', payload)
      .then((response) => {
    
      })
      .catch((error) => {
        console.log("error: ", error);
      })

```
  - add a payload

```
  const loginPayload = {
    login: "andrea",
    password: "harry"
  }
```

  - prepare to send the token when calling the userService

- on userService
  - first lets create an endpoint to load information on a user

```
app.get("/user/:userId", (req, res) => {
const userId = req.params.userId;
console.log("user id: ", userId);
res.json({userId: userId, message: "request success"});
})
```
  - to have something a little more interesting to return, lets copy this

```
const users = {
  1: {
    name: "some name",
    email: "some-email@gmail.com"
  },
  2: {
    name: "another name",
    email: "another-email@gmail.com"
  },
  3: {
    name: "yet another name",
    email: "yet-another-email@gmail.com"
  }
}
```
  - and change to return the info

```
  res.json({user: users[userId], message: "request success"});

```

- on firstService
  - lets call the new endpopint
  - obs: change the endpoint function to be async

```
  let data;
  await axios.get(USER_HOST + "/user/1")
  .then((response) => {
    console.log("response: ", response.data)
    data = response.data
  })
  .catch((error) => {
    console.log("user service error: ", error)
  });

```

  - now we want to send the JWT token to the user service
  - first lets buil our header:

```
const header = {
  headers: {
    authorization: "Bearer <JWT_TOKEN>",
  }
}
```
  - build a function to send the header 
  - modify the get call

```

const config = (value) => {
  return {
    headers: {
      authorization: value,
    }
  }
};

  
  axios.get(USER_HOST + "/user/1", header(token))

```

- on user service
  - lets check if we are receiving the header correctly


```
  const authHeader = req.headers['authorization'];
  console.log("authHeader: " + authHeader);

```
  - test using postman and calling the first service


  - create a middleware for the jwt validation
  - create file jwtValidate.js
  - move the authHeader to the middleware
  - export function
  - add middleware on user endpoit

```
const jwtValidate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ")[1];
  console.log(token);

  next();
}

module.exports = { jwtValidate };
```

- on the validate middleware
  - add imports
  - add function call
```
const fs = require('fs');
const jwt = require('jsonwebtoken');

//       const validationResult = jwt.verify(token, publicKey, verifyOptions);

```

  - add public key to file
  - read file
  - add verifyOptions

```
const publicKey = fs.readFileSync('./secrets/public.key', 'utf8');

const verifyOptions = {
  issuer: "my own issuer",
  subject: "some-subject",
  expiresIn: "12h",
  algorithm: ["RS256"]
};

```

  - test from postman
  - test with error changing the token

- test from folder

/Users/camorim/dev/general/PARA_APRESENTAR/jwtExample
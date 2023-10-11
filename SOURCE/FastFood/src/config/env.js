// const myUrl = 'https://hrcvn.tk';
const myUrl = "http://localhost:3000";
export default {
  releaseVersion: false,
  secret: {
    username: "wisami_base_1522119499",
    password: "wisami_base_secret_1522119999"
  },

  role: {
    user: "user",
    employ: "employ",
    admin: "admin"
  },

  api: {
    host: {
      base: "http://localhost:9000",
      upload: "http://localhost:4000"
    },
    path: {
      upload: {
        upFile: "/upload"
      },
      base: {
        categories: "/categories",
        products: "/products",
        users: "/users",
        usersSearch: "/users/queryUsers",
        orders: "/orders"
      }
    }
  },
  code: {
    success: 3,
    error: {
      tokenFail: 6,
      tokenExpire: 7
    }
  },
  asyncStorage: {
    loginOK: "loginOk",
    user: "user"
  }
};

var dataService = require("./data.service");
var helperService = require("./helper.service");
var emitterService = require("./emitter.service");
var globalService = require("./global.service");
// var loopback = require("loopback");
// var app = loopback();
var fs = require("fs");
const axios = require("axios");
const ShortcodeTree = require("shortcode-tree").ShortcodeTree;
const chalk = require("chalk");
var { GraphQLClient, gql, request } = require("graphql-request");
var frontEndTheme = `${process.env.FRONT_END_THEME}`;
const adminTheme = `${process.env.ADMIN_THEME}`;

module.exports = userService = {
  startup: async function () {
    emitterService.on("getRenderedPagePostDataFetch", async function (options) {
      if (options) {
        options.page.data.showPageBuilder = await userService.isAuthenticated(
          options.req
        );
      }
    });

    emitterService.on("requestBegin", async function (options) {
      if (options.req.url === "/register") {
        options.req.isRequestAlreadyHandled = true;
        let data = { registerMessage: "<b>admin</b>" };
        options.res.render("admin/shared-views/admin-register", {
          layout: `front-end/${frontEndTheme}/login.handlebars`,
          data: data,
        });

        // options.res.sendFile(file);
        // options.req.isRequestAlreadyHandled = true;
        // return;
      }
    });

    emitterService.on("postBegin", async function (options) {
      if (options.req.url === "/register") {
        // var user = loopback.getModel("user");
        let email = options.req.body.email;
        let password = options.req.body.password;
        let passwordConfirm = options.req.body.passwordConfirm;

        let newUser = await userService.createUser(email, password);

        globalService.isAdminUserCreated = true;
        let message = encodeURI(`Account created successfully. Please login`);
        res.redirect(`/admin?message=${message}`); // /admin will show the login
        return;
      }
    });
  },

  createUser: async function (email, password) {
    const query = gql`
    mutation{
      addUser(email:"${email}", password:"${password}"){
        email
        id
      }
    }
      `;

    let data = await dataService.executeGraphqlQuery(query);

    return data.contents;
  },

  // getUsers: async function () {
  //   var userModel = loopback.getModel("user");
  //   let users = await userModel.find();
  //   // console.log(users);
  //   return users;
  // },

  // getUser: async function (id) {
  //   var userModel = loopback.getModel("user");
  //   let user = await userModel.findById(id);
  //   return user;
  // },

  // getRoles: async function () {
  //   var roleModel = loopback.getModel("Role");
  //   let roles = await roleModel.find();
  //   // console.log(users);
  //   return roles;
  // },

  // getRole: async function (id) {
  //   var roleModel = loopback.getModel("Role");
  //   let role = await roleModel.findById(id);
  //   return role;
  // },

  // getCurrentUserId: async function (req) {
  //   if (req.signedCookies && req.signedCookies.sonicjs_access_token) {
  //     let tokenInfo = await globalService.AccessToken.findById(
  //       req.signedCookies.sonicjs_access_token
  //     );
  //     if (tokenInfo && tokenInfo.userId) {
  //       return tokenInfo.userId;
  //     }
  //   }
  // },

  // getCurrentUser: async function (req) {
  //   var userModel = loopback.getModel("user");
  //   let a = app;
  //   let userId = await userService.getCurrentUserId(req);
  //   if (userId) {
  //     let user = await userModel.findById(userId);
  //     if (user) {
  //       return user;
  //     }
  //   }
  // },

  // isAuthenticated: async function (req) {
  //   var authCookie = await this.getToken(req);
  //   let userId = await userService.getCurrentUserId(req);
  //   if (authCookie && userId) {
  //     return true;
  //   }
  //   return false;
  // },

  // getToken: async function (req) {
  //   return req.signedCookies.sonicjs_access_token;
  // },
};

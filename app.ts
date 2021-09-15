import * as path from "path";

import express from "express";
import bodyParser from "body-parser";

import rootPath from "./src/util/rootPath";

import AdminRoutes from "./src/routes/AdminRoutes";
import ShopRoutes from "./src/routes/ShopRoutes";

import ErrorController from "./src/controllers/ErrorController";

import dbInit from "./src/database/dbInit";
import User from "./src/models/User";
import { RequestContext } from "./src/@types/express";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootPath, "public")));

// This is only to avoid the default favicon request activating the middlewares.
app.get("/favicon.ico", (req, res) => res.status(204));

app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (!user) {
      return;
    }
    req.context = { user };
    next();
  } catch (error) {
    console.log(error);
  }
});

app.use("/admin", AdminRoutes);
app.use(ShopRoutes);

app.use(ErrorController.get404);

dbInit(() => {
  app.listen(3000);
});

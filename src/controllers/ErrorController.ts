import { Request, Response } from "express";

const ErrorController = {
  get404: (req: Request, res: Response) => {
    res.status(404).render("404", { path: "/page-not-found", pageTitle: "Page not found" });
  },
};

export default ErrorController;

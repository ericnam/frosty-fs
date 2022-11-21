import { Router } from "express";

const initRoutes = (router: Router) => {
  router.get(["/", "/*"], (req, res) => {
    res.sendFile("client/dist/index.html", { root: "./" });
  });
};

export default initRoutes;

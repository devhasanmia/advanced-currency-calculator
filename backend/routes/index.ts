import { Router } from "express";
import { ratesRouter } from "./rates";
const router = Router();

const moduleRoutes = [
    {
        path: "/rates",
        route: ratesRouter,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

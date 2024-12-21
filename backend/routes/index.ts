import { Router } from "express";
import { ratesRouter } from "./rates";
import { historicalRatesRoute } from "./historicalRatesRoutes";
const router = Router();

const moduleRoutes = [
    {
        path: "/rates",
        route: ratesRouter,
    },
    {
        path:"/historical",
        route: historicalRatesRoute,
    }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

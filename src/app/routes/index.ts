import { Router } from "express";
import { TRoutes } from "./interface";
import { userRoutes } from "../modules/user/route.user";
import { roomsRoutes } from "../modules/room/route.room";
import { slotRoutes } from "../modules/slot/route.slot";
import { bookingRoutes, routeUser } from "../modules/booking/route.booking";

const router = Router();

const modulesRoutes: TRoutes[] = [
  {
    path: "/",
    route: routeUser,
  },
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/rooms",
    route: roomsRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

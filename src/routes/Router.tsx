import * as React from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import { RouteEndpoints } from "./route";
import Home from "../pages/Home/Home";
import Chart from "../pages/Chart/Chart";
import NotFound from "../pages/NotFound/NotFound";

const Routes = () => {
  const routes: RouteObject[] = [
    {
      path: RouteEndpoints.Table,
      element: <Home />,
    },
    {
      path: RouteEndpoints.CHART,
      element: <Chart />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return useRoutes(routes);
};
export default Routes;

import { Express } from "express";
import { AuthRoutes } from "./user/user";
import { DashboardRoutes } from "./dashboard/dashboard";

export class RoutesApi {
    private _app: Express; //Api principal
    private authRouter: AuthRoutes;
    private dashboardRouter: DashboardRoutes;

    constructor(app: Express) {
        this._app = app;
        this.authRouter = new AuthRoutes();
        this.dashboardRouter = new DashboardRoutes();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._app.use('/api/v1/user', this.authRouter.router);
         this._app.use('/api/v1/dashboard', this.dashboardRouter.router);
    }
}


//localhost:3000/api/v1/user/create
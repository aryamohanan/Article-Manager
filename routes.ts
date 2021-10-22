
import { Application, Request, Response } from 'express';
import { ArticleController, HealthStatusController, UserController } from './lib/controllers';

class Route {
  path: string;
  action: (request: Request, response: Response) => {};
  verb: RestVerb;

  constructor(verb: RestVerb, path: string, action: (request: Request, response: Response) => {}) {
    this.path = path;
    this.action = action;
    this.verb = verb;
  }
}
enum RestVerb {
  show = 'get',
  index = 'get',
  create = 'post',
  edit = 'patch',
  update = "put",
  delete = "delete"
}
export class Routes {
  private app: Application;
  routes: Array<Route> = [];

  private controllers = {
    HealthStatusController: new HealthStatusController(),
    ArticleController: new ArticleController(),
    UserController: new UserController()
  }
  constructor(app: Application) {
    this.app = app;
  }
  static call(app: any) {
    const instance = new Routes(app);
    instance.call();
  }

  call() {
    this.routes.push(new Route(RestVerb.show, '/api/v1/status(||/0)', this.controllers.HealthStatusController.show));
    this.routes.push(new Route(RestVerb.show, '/article/:id', this.controllers.ArticleController.show));
    this.routes.push(new Route(RestVerb.create, '/article', this.controllers.ArticleController.create));
    this.routes.push(new Route(RestVerb.update, '/article/:id', this.controllers.ArticleController.update));
    this.routes.push(new Route(RestVerb.create, '/newUpdates', this.controllers.ArticleController.newUpdates));
    this.routes.push(new Route(RestVerb.show, '/user/:id', this.controllers.UserController.show));
    this.routes.push(new Route(RestVerb.create, '/user', this.controllers.UserController.create));
    this.routes.push(new Route(RestVerb.update, '/user/:id', this.controllers.UserController.update));
    this.routes.forEach((route) => {
      this.app[route.verb](route.path, route.action);
    });
  }
}
import { HTTPRequestLogger } from "./HTTPRequestLogger";

type Middleware = typeof HTTPRequestLogger;

const middlewares = <Middleware[]>[HTTPRequestLogger];

export { middlewares };

import User from "../../models/User";

interface RequestContext {
  user: User;
}

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}

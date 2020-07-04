import { Request, Response, NextFunction } from "express";

class AdministratorValidatorController {
    static create(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static update(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static destroy(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static show(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static tutorUnvalidated(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

class AdministratorController {
    static tutorUnvalidated(req: Request, res: Response, next: NextFunction) {
        next();
    }
    static create(req: Request, res: Response, next: NextFunction) {}
    static update(req: Request, res: Response, next: NextFunction) {}
    static destroy(req: Request, res: Response, next: NextFunction) {}
    static show(req: Request, res: Response, next: NextFunction) {}
}

export {
    AdministratorValidatorController
}

export default AdministratorController;
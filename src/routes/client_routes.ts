import path from 'path';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'resources', 'public', 'index.html'));
});

export default router;
import path from 'path';
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/doc', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'resources', 'public', 'doc', 'index.html'));
});

router.get('/reports/local', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'resources', 'public', 'reports', 'local.html'));
});

router.get('/reports/server', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'resources', 'public', 'reports', 'server.html'));
});

router.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'resources', 'public', 'index.html'));
});

export default router;
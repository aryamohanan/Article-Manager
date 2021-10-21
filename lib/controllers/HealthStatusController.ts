import { Request, Response } from 'express';

export class HealthStatusController {
    async show(request: Request, response: Response) {
        const appHealth = {
            appStatus: 'alive',
            hash: process.env.ShortHash
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(appHealth));
    }
}
import { Application } from 'express';
declare class App {
    app: Application;
    private readonly PORT;
    constructor();
    /**
     * Initialize database connection
     */
    private initializeDatabase;
    /**
     * Initialize middleware
     *
     * Middleware order matters! Each middleware is executed in the order it's defined.
     */
    private initializeMiddleware;
    /**
     * Initialize API routes
     */
    private initializeRoutes;
    /**
     * Initialize error handling middleware
     *
     * Error handling middleware should be defined last
     */
    private initializeErrorHandling;
    /**
     * Start the server
     */
    listen(): void;
}
declare const app: App;
export default app;
//# sourceMappingURL=app.d.ts.map
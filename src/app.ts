import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import invoiceRoutes from './routes/invoice.routes';
import atsRoutes from './routes/ats.routes';
import traceabilityRoutes from './routes/traceability.routes';
import dashboardRoutes from './routes/dashboard.routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
  }

  private configureMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private configureRoutes(): void {
    this.app.use('/api/users', userRoutes);
    this.app.use('/api/invoices', invoiceRoutes);
    this.app.use('/api/ats', atsRoutes);
    this.app.use('/api/traceability', traceabilityRoutes);
    this.app.use('/api/dashboard', dashboardRoutes);
    
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK', timestamp: new Date() });
    });
  }
}

export default new App().app;

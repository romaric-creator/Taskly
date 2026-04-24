import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route de bienvenue / test
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Bienvenue sur l'API Zenith Tasks Pro",
    status: "Online"
  });
});

// Health Check pour vérifier l'état du serveur
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ uptime: process.uptime(), timestamp: new Date().toISOString() });
});


// Capture les routes inexistantes (404)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Gestionnaire d'erreurs global (ErrorHandler)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Une erreur interne est survenue";

  console.error(`[Error]: ${message}`);

  res.status(status).json({
    success: false,
    error: {
      message,
      // On n'affiche la stack trace qu'en développement
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
});

export default app;

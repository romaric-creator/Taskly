import app from './app';
import sequelize from './config/db';

// Importation des modèles pour initialiser les relations Sequelize
// Note : Les imports de modèles sont essentiels pour sequelize.sync()
  import './models/users.model';
import './models/projet.model';
import './models/task.model';

const PORT = process.env.PORT || 3000;

/**
 * Fonction d'initialisation du serveur (Bootstrap)
 */
async function startServer() {
  try {
    console.log('Connexion à la base de données MySQL...');

    // 1. Authentification
    await sequelize.authenticate();
    console.log('Connexion à MySQL établie.');

    // 2. Synchronisation des modèles avec la base de données
    // force: false = ne supprime pas les données existantes
    await sequelize.sync({ force: false });
    console.log('Modèles synchronisés avec succès.');

    // 3. Démarrage de l'écoute réseau
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur : http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Échec critique lors du démarrage du serveur :');
    console.error(error);

    // Arrêt du processus en cas d'erreur de connexion à la DB
    process.exit(1);
  }
}

// Lancement effectif
startServer();

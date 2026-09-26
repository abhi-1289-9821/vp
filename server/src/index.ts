import app from './app';
import { config } from './config/env';
import { logger } from './utils/logger';

const PORT = config.PORT;
const storagePath = config.STORAGE_PATH;

if (config.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`=======================================================`);
    logger.info(` SAHAAY Backend API Server running on port ${PORT}`);
    logger.info(` Tagline: "Your Land. Your Case. Your Information."`);
    logger.info(` Storage path: ${storagePath}`);
    logger.info(` Health check: http://localhost:${PORT}/api/health`);
    logger.info(`=======================================================`);
  });
}

export default app;

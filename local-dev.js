// Local development script for Windows compatibility
process.env.NODE_ENV = 'development';

// Import and run the main server
import('./server/index.ts').then(() => {
  console.log('Development server started successfully!');
}).catch((error) => {
  console.error('Failed to start development server:', error);
  process.exit(1);
});
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/agri-schemes'
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRY || '15m',
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || ''
  },
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || 'us-east-1',
    index: process.env.PINECONE_INDEX || 'agricultural-schemes'
  }
};

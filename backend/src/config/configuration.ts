export default (): Record<string, unknown> => {
  return {
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 27017,
    },
    stripe: {
      apiKey: process.env.STRIPE_KEY || 'sk_test_dBig0b9lzrkUOFOZsGLE1GSd',
      apiVersion: '2020-03-02',
    },
    jwt: {
      instructor: { key: process.env.JWT_KEY || 'test_key' },
    },
  };
};

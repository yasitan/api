type EnvKey =
  'APP_MONGODB_URI' |
  'MONGODB_COLLECTION_PREFIX';

export const getEnv = (name: EnvKey): string => {
  const value = process.env[name];
  if (!value) {
    console.log(`🔥 DBG::Missing env ${name}`);
  }

  return value || '';
};

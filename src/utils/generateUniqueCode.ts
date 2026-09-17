import crypto from 'crypto'

export const generateuniqueCode= () => {
  const code = crypto.randomUUID();

  return code.slice(0,6);
}

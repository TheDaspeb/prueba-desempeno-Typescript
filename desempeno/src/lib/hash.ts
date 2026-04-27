import crypto from 'crypto';

export async function hashValue(value: string): Promise<string> {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

export async function compareHash(value: string, hash: string): Promise<boolean> {
  const valueHash = await hashValue(value);
  const valueHashBuffer = Buffer.from(valueHash, 'hex');
  const hashBuffer = Buffer.from(hash, 'hex');

  if (valueHashBuffer.length !== hashBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(valueHashBuffer, hashBuffer);
}

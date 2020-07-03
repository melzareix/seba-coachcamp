import * as bcrypt from 'bcryptjs';

export function compareHash(str: string, hash: string): Promise<boolean> {
  return new Promise((resolve, error) => {
    bcrypt.compare(str, hash, (err, success) => {
      if (err) {
        return error(err);
      }
      resolve(success);
    });
  });
}

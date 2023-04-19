import bcryptjs from 'bcryptjs';

const saltRounds = 10;

export function generateHash(password: string): string {
  const salt = bcryptjs.genSaltSync(saltRounds);
  const hash = bcryptjs.hashSync(password, salt);
  return hash;
}

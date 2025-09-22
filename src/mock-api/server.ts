import fs from 'fs/promises';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const USERS_PATH = path.join(__dirname, 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const PORT = Number(process.env.PORT || 4001);

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  passwordHash: string;
}

interface SafeUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
}

interface JWTPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}

const isEmail = (v: unknown) => typeof v === 'string' && v.includes('@');
const badRequest = (res: Response, message: string) =>
  res.status(400).json({ message });

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf8');
    return JSON.parse(data || '[]') as User[];
  } catch {
    return [];
  }
}
async function writeUsers(users: User[]) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2), 'utf8');
}
function toSafeUser(u: User): SafeUser {
  const { id, email, firstName, lastName, bio } = u;
  return { id, email, firstName, lastName, bio };
}
function createToken(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
function auth(
  req: Request & { user?: JWTPayload },
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

app.post('/auth/register', async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, bio } = req.body || {};

  if (!email || !isEmail(email))
    return badRequest(res, 'Valid email is required');
  if (!password || String(password).length < 8)
    return badRequest(res, 'Password must be at least 8 characters');
  if (!firstName || String(firstName).trim().length < 2)
    return badRequest(res, 'First name min 2 chars');
  if (!lastName || String(lastName).trim().length < 2)
    return badRequest(res, 'Last name min 2 chars');
  if (bio && String(bio).length > 240)
    return badRequest(res, 'Bio must be under 240 chars');

  const users = await readUsers();
  if (users.find((u) => u.email.toLowerCase() === String(email).toLowerCase()))
    return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(String(password), 10);
  const user: User = {
    id: Date.now().toString(),
    email: String(email).trim(),
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    bio: (bio ? String(bio) : '').trim(),
    passwordHash
  };

  users.push(user);
  await writeUsers(users);

  const token = createToken({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });

  return res.status(201).json({
    message: 'Registered',
    user: toSafeUser(user),
    token
  });
});

app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body || {};

  if (!email || !isEmail(email))
    return badRequest(res, 'Valid email is required');
  if (!password) return badRequest(res, 'Password is required');

  const users = await readUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = createToken({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });

  return res.json({
    message: 'Logged in',
    user: toSafeUser(user),
    token
  });
});

app.get(
  '/me',
  auth,
  async (req: Request & { user?: JWTPayload }, res: Response) => {
    const users = await readUsers();
    const me = users.find((u) => u.id === req.user?.id);
    if (!me) return res.status(404).json({ message: 'User not found' });
    return res.json(toSafeUser(me));
  }
);

app.listen(PORT, () => {
  console.log(`Mock API listening on http://localhost:${PORT}`);
});

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const mockUser = {
    id: 'usr-994821',
    email: email || 'alex.architect@intellidoc.ai',
    name: 'Alex Rivera',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    role: 'ADMIN',
  };

  const token = jwt.sign(mockUser, env.JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    success: true,
    user: mockUser,
    token,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  const newUser = {
    id: `usr-${Math.floor(Math.random() * 899999 + 100000)}`,
    email: email || 'new.user@intellidoc.ai',
    name: name || 'Enterprise Administrator',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    role: 'USER',
  };

  const token = jwt.sign(newUser, env.JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    success: true,
    user: newUser,
    token,
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: {
      id: 'usr-994821',
      email: 'alex.architect@intellidoc.ai',
      name: 'Alex Rivera',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
      role: 'ADMIN',
      apiKey: 'idp_live_99481023812039481230',
    },
  });
};

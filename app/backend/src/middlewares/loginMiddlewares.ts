import { RequestHandler } from 'express';

const emailAndPasswordRequired: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: 'All fields must be filled' });

  if (!password) return res.status(400).json({ message: 'All fields must be filled' });

  next();
};

const emailMustBeValidEmail: RequestHandler = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const testEmail = regexEmail.test(email);

  if (!testEmail) return res.status(401).json({ message: 'Invalid email or password' });

  next();
};

const passwordMinLength: RequestHandler = (req, res, next) => {
  const { password } = req.body;

  if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });

  next();
};

export default {
  emailAndPasswordRequired,
  emailMustBeValidEmail,
  passwordMinLength,
};

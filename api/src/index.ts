import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AUTH_LIST, QUOTES, secretKey } from './data';
import { LoginDTO } from './types';
import { decodeJWT, isLoggedIn } from './middlewares';
import { getRandomNumber } from './helpers';

const app = express();
const port = 8080;

// Declaration of global middlewares
app.use(cors());
app.use(express.json());
app.use(decodeJWT);

/**
 * Simple authorization route
 */
app.post('/api/login', (req: Request<any, any, LoginDTO>, res: Response) => {
  try {
    if (
      typeof req.body?.email !== 'string' ||
      typeof req.body?.password !== 'string'
    ) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const foundUser = AUTH_LIST.find(
      (user) => user.email.toLowerCase() === req.body.email.toLowerCase()
    );

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (foundUser.password === req.body.password) {
      const token = jwt.sign({ id: foundUser.id }, secretKey, {
        expiresIn: '1h',
      });
      return res.json({
        success: true,
        token,
        user: {
          name: foundUser.name,
          email: foundUser.email,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  } catch (error) {
    console.error('Internal error occurred in the login path', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
});

/**
 * Dashboard route, it will return a quote to only authorized users
 */
app.get('/api/dashboard', isLoggedIn, function (req, res) {
  try {
    const index = getRandomNumber(0, QUOTES.length - 1);
    const quote = QUOTES[index];

    return res.status(200).json({
      success: true,
      quote,
    });
  } catch (error) {
    console.error('Internal error occurred in the dashboard path', error);
    return res.status(500).json({ success: false, message: 'Internal error' });
  }
});

app.all('*', function (req, res) {
  return res.status(404).json({
    success: false,
    message: 'Given path does not exists!',
  });
});

app.listen(port, function () {
  console.log(`Server is listening on http://localhost:${port}`);
});


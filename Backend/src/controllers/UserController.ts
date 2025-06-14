import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';
import User from '../models/UserModel'; 

// REGISTRO
export const Register = async (req: Request, res: Response) => {
  try {
    const { name, surname, email, password } = req.body;

    const userExisting = await User.findOne({ where: { email } });
    if (userExisting) {
      throw new Error("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      surname,
      email,
      password: encryptedPassword,
    });

    const accessToken = jwt.sign({ userId: newUser.id }, TOKEN_SECRET);
    res.cookie("token", accessToken);
    res.status(200).json(newUser);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// LOGIN
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email inválido' });
    }

    const descryptedPassword = await bcrypt.compare(password, user.password);
    if (!descryptedPassword) {
      return res.status(401).json({ message: 'Password inválido' });
    }

    const accessToken = jwt.sign({ userId: user.id }, TOKEN_SECRET);
    res.cookie("token", accessToken);
    res.status(200).json({ accessToken, user });
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

// LOGOUT
export const Logout = async (_req: Request, res: Response) => {
  res.cookie("token", "", {
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// VERIFICAR TOKEN
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (!token) return res.send("error del token");

  jwt.verify(token, TOKEN_SECRET, async (error: any, userData: any) => {
    if (error) return res.status(401).json(["Token no válido"]);

    const userFound = await User.findByPk(userData.userId);
    if (!userFound) return res.status(401).json(["Usuario no autorizado"]);

    return res.json({
      id: userFound.id,
      email: userFound.email,
    });
  });
};

// FILTRAR POR ID
export const filterUserforId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("No se encuentra al usuario con ese ID");
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

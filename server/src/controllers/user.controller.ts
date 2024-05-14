// controllers/usersController.ts
import { Request, Response } from "express";

// Simulación de datos (solo para propósitos de ejemplo)
let users: { id: number; name: string }[] = [
  { id: 1, name: "Usuario 1" },
  { id: 2, name: "Usuario 2" },
];

// Obtener todos los usuarios
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

// Obtener un usuario por ID
export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

// Crear un nuevo usuario
export const createUser = (req: Request, res: Response) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
};

// Actualizar un usuario existente por ID
export const updateUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const updatedUserData = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

// Eliminar un usuario por ID
export const deleteUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Usuario no encontrado" });
  }
};

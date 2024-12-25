import { Router } from "express";
import { UserSession } from "#common-app/models/user-session.ts";
import { mockRepository } from "../../dals/user/repositories/user.mock-repository";
import jwt from "jsonwebtoken";

export const securityAPI = Router();

securityAPI.post("login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await mockRepository.getUserByEmailAndPassword(
      email,
      password
    );
    if (user) {
      const userSession : UserSession = {
        id: user._id.toHexString()
      }
      const secret = "my-secret"; //TODO: Move to .env variables
      const token = jwt.sign(userSession, secret, {
        expiresIn: "1d",
        algorithm: "HS256"
      });
      res.send(`Bearer ${token}`);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

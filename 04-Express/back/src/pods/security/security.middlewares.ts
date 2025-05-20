import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserSession } from "../../common-app/models/user-session";

const verify = (token: string, secret: string): Promise<UserSession> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        reject(error);
      }

      const userSession = decoded as UserSession;

      if (userSession) {
        resolve(userSession);
      } else {
        reject();
      }
    });
  });

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader ? authorizationHeader.split(" ")[1] : null;
};

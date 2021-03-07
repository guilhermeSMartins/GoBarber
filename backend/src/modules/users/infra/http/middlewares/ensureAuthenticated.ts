import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';

interface TokenPayload {
  iat: number,
  exp: number,
  sub: string
}

type ExtendedRequest = Request & { userId: string };

export default function ensureAuthenticated(
  req: ExtendedRequest,
  res:Response,
  next:NextFunction
):void{

  const authHeader = req.headers.authorization

  if(!authHeader){
    throw new Error('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try{
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    req.userId = sub

    return next()

  } catch(err){
    throw new Error('Invalid JWT token')
  }
}
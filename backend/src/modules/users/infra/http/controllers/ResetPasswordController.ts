import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';



export default class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<void> {
    const { password, token } = req.body;

    const resetPassword = container.resolve(
      ResetPasswordService,
    );

    await resetPassword.execute({
      token,
      password
    });
  }
}
import IMailProvider from "../../MailProvider/models/IMailProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default class FakeMailTemplateProvider implements IMailProvider {
  public async parse({}: IParseMailTemplateDTO): Promise<string> {
    return 'template';
  }

  sendMail(to: string, body: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
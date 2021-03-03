import React, { useCallback, useRef } from "react";
import App from "../../App";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { object, string, ValidationError } from "yup";
import { Form } from '@unform/web';

import { Container, Content, Background } from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { useAuth } from '../../hooks/AuthContext';
import { FormHandles } from "@unform/core";
import { useContext } from "react";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInFormData): Promise<void> => {

    try {
      formRef.current?.setErrors({});

      const schema = object().shape({
        name: string().required("Nome obrigatório"),
        email: string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false, //return all errors
      });

      signIn(data.email, data.password);
    } catch (err) {
      if(err instanceof ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);  
      }
      

    }
  }, [signIn]);

  return (
    <Container>
      <Content>
        <img src="" alt="logo" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;

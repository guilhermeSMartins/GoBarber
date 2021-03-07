import React, { useCallback, useRef } from "react";
import App from "../../App";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { object, string, ValidationError } from "yup";
import { Form } from '@unform/web';

import { Container, Content, Background, AnimationContainer } from "./styles";

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

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

      await signIn({ 
        email: data.email, 
        password: data.password
      });

      history.push('/dashboard');
    } catch (err) {
      if(err instanceof ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);  

        return;
      }
    }

    addToast({
      type: 'error',
      title: 'Erro na autenticação',
      description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
    });
  }, [signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
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

        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;

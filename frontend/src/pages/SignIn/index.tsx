import React, { useContext } from 'react';
import App from '../../App';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';

const SignIn: React.FC = () => {
    const { signIn } = useContext(AuthContext);

    try{
        formRef.current?.setErrors({})
  
        const schema = Yup.object().shape({
          email: Yup.string().required('Campo obrigatório').email('Digite um email válido'),
          password: Yup.string().required('Senha obrigatória'),
        })
        await schema.validate(data, {
          abortEarly: false
        })
  
        await signIn({
          email: data.email,
          password: data.password
        })
  
        history.push('/dashboard')
  
    } 
    catch(err){
        if(err instanceof Yup.ValidationError){
          const errors =  getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
  
        addToast({
          type: 'error',
          title: 'Erro durante o login',
          description: 'Cheque suas credenciais e tente novamente'
        })
  
      }
    }, [signIn])
  

    return (
        <Container>
            <Content>
                <img src="" alt="logo"/>

                <form action="">
                    <h1>Faça seu logon</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>
                </form>

                <a href="login">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>

    );
}

export default SignIn;
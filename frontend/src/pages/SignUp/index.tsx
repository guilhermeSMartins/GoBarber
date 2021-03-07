import React, { useCallback, useContext, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background, AnimationContainer } from './styles';
import { object, string, ValidationError } from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    //const { name } = useContext(AuthContext);

    const handleSubmit = useCallback(async (data: SignUpFormData): Promise<void> => {
        try {
            formRef.current?.setErrors({});

            const schema = object().shape({
                name: string().required('Nome obrigatório'),
                email: string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: string().min(6, 'No mínimo 6 dígitos')
            });

            await schema.validate(data, {
                abortEarly: false //return all errors
            });

            await api.post('/users', data);

            history.push('/');

            addToast({
                type: 'success',
                title: 'Cadastro realizado!',
                description: 'Você já pode fazer seu logon no GoBarber!'
            });
        } catch (err) {
            if(err instanceof ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro no cadastro',
                description: 'Ocorreu um erro ao fazer cadastro, tente novamente.'
            });
        }
    }, [addToast, history])

    return (
        <Container>
            <Background />
            <Content>
                    <AnimationContainer>
                    <img src="" alt="logo"/>
        
                    <Form ref={formRef} initialData={{ name: 'rupau' }} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>
        
                        <Input name="name" icon={FiUser} placeholder="Nome"/>
                        <Input name="email" icon={FiMail} placeholder="E-mail" />
                        <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
        
                        <Button type="submit">Cadastrar</Button>
                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
        
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )
    
}


export default SignUp;
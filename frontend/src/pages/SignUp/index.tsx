import React, { useCallback, useContext, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { Container, Content, Background, AnimationContainer } from './styles';
import { object, string } from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    //const { name } = useContext(AuthContext);

    const handleSubmit = useCallback(async (data: object): Promise<void> => {
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
        } catch (err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, [])

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
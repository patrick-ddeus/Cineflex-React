import React from 'react';
import { Container } from './styles';
export default function ErrorMessage ({ message }) {
    return (
        <Container>{message}</Container>
    );
}

import React from 'react';
import LoadingGif from "../../assets/loading.gif";
import { Container } from './styles';
export default function Loading () {
    return (
        <Container>
            <img src={LoadingGif} alt="" />
            <h2>Loading...</h2>
        </Container>
    );
}

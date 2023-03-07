import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Order from "../../services/order";
import React from "react";

import { adicionaZeroAEsquerda } from "../../utils/utils";

export default function SuccessPage () {
    const orderInfo = JSON.parse(localStorage.getItem("order")) || Order.getOrder();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1400);
    }, []);

    function cleanOrder () {
        localStorage.removeItem("order");
    }

    return (
        <>
            {loading ? <Loading /> :
                <PageContainer>
                    <h1>Pedido feito <br /> com sucesso!</h1>

                    <TextContainer>
                        <strong><p>Filme e sessão</p></strong>
                        <p>{orderInfo.movie.title}</p>
                        <p>{`${orderInfo.session.date} - ${orderInfo.session.showtimes.name}`}</p>
                    </TextContainer>

                    <TextContainer>
                        <strong><p>Ingressos</p></strong>
                        {orderInfo.seats.map(seat => (
                            <p key={seat.id}>{`Assento ${adicionaZeroAEsquerda(seat.name)}`}</p>
                        ))}
                    </TextContainer>

                    <TextContainer>
                        <strong><p>Comprador</p></strong>
                        <p>Nome: {orderInfo.buyer.name}</p>
                        <p>CPF: {orderInfo.buyer.cpf}</p>
                    </TextContainer>
                    <Link to={"/"} onClick={cleanOrder}>
                        <button>Voltar para Home</button>
                    </Link>
                </PageContainer>
            }

        </>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        cursor:pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`;
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`;
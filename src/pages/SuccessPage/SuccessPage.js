import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import Order from "../../db/order";
import React from "react";

import { adicionaZeroAEsquerda } from "../../utils/utils";
import * as S from "./styles"
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
        Order.resetOrder()
        localStorage.removeItem("order");
    }

    return (
        <>
            {loading ? <Loading /> :
                <S.PageContainer>
                    <h1>Pedido feito <br /> com sucesso!</h1>

                    <S.TextContainer data-test="movie-info">
                        <strong><p>Filme e sessão</p></strong>
                        <p>{orderInfo.movie.title}</p>
                        <p>{`${orderInfo.session.date} - ${orderInfo.session.showtimes.name}`}</p>
                    </S.TextContainer>

                    <S.TextContainer data-test="seats-info">
                        <strong><p>Ingressos</p></strong>
                        {orderInfo.seats.map(seat => (
                            <p key={seat.id}>{`Assento ${adicionaZeroAEsquerda(seat.name)}`}</p>
                        ))}
                    </S.TextContainer>

                    <S.TextContainer>
                        <strong><p>Comprador(es)</p></strong>
                        {orderInfo.buyer.compradores.map((comprador, index) => (
                            <S.BuyerContainer key={index} data-test="client-info">
                                <p>Nome: {comprador.name}</p>
                                <p>Cpf: {comprador.cpf}</p>
                            </S.BuyerContainer>
                        ))}
                    </S.TextContainer>
                    <Link to={"/"} onClick={cleanOrder} data-test="go-home-btn">
                        <button>Voltar para Home</button>
                    </Link>
                </S.PageContainer>
            }

        </>
    );
}


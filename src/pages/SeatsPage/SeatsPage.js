/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React from "react";
import MovieService from "../../services/movie.api";
import BodyPost from "../../db/body.post";
import Order from "../../db/order";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { adicionaZeroAEsquerda } from "../../utils/utils";

import * as S from "./styles";
export default function SeatsPage () {
    const [pageConfig, setPageConfig] = React.useState({
        seatInfo: null,
        loading: false,
        serverError: null
    });

    const [inputsConfig, setInputsConfigs] = React.useState([]);
    const [seats, setSeats] = React.useState([]);
    const { sessionId } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        const MovieAPI = new MovieService();
        setPageConfig({ ...pageConfig, loading: true });

        async function fetchSeatData () {
            try {
                const seatData = await MovieAPI.getSeats(sessionId);
                setPageConfig({ ...pageConfig, loading: false, seatInfo: seatData });
            } catch (error) {
                setPageConfig({ ...pageConfig, loading: false, serverError: error });
            }
        }

        fetchSeatData();
    }, []);

    React.useEffect(() => {
        Order.setSeatsData(seats);
        Order.saveOrder();
    }, [seats]);


    function handleInput (event, index) {
        const { name, value } = event.currentTarget;
        const newInputs = [...inputsConfig];
        if (name === "cpf") {
            newInputs[index][name] = value.replace(/\D+/gi, "");
        } else {
            newInputs[index][name] = value;
        }
        setInputsConfigs(newInputs);
    }

    function handleFormSubmit (event) {
        event.preventDefault();
        try {
            handleSubmit();
            navigate("/sucesso");
        } catch (error) {
            setPageConfig({ ...pageConfig, serverError: error });
        }
    }

    function handleSubmit () {
        const MovieApi = new MovieService();
        try {
            BodyPost.setSeats([...seats]);
            BodyPost.setBuyer(inputsConfig);
            MovieApi.postSeat(BodyPost.getBodyPost());
            Order.setBuyerData(BodyPost.getBodyPost());
            Order.saveOrder();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    function handleSeats (seat) {
        const existingSeat = seats.find(seatNameStored => seatNameStored === seat);
        if (!existingSeat && seat.isAvailable) {
            setSeats([...seats, seat]);
            setInputsConfigs([...inputsConfig, {idAssento: seat.id}])
        } else if (existingSeat && seat.isAvailable) {
            const confirmDelete = confirm("Tem certeza que deseja desmarcar o assento?");
            if (confirmDelete) {
                const transformedSeats = seats.filter(seatNameStored => seatNameStored !== seat);
                const transformedInputs = inputsConfig.filter(input => input.idAssento !== seat.id);
                setSeats(transformedSeats);
                setInputsConfigs(transformedInputs);
            }
        } else {
            alert("Esse assento não está disponível");
        }
    }

    return (
        <>
            {pageConfig.loading ? <Loading /> :
                <S.PageContainer>
                    Selecione o(s) assento(s)

                    <S.SeatsContainer>
                        {pageConfig.seatInfo && pageConfig.seatInfo.seats.map(seat => (
                            <S.SeatItem
                                data-test="seat"
                                selected={seats.includes(seat)}
                                available={seat.isAvailable}
                                onClick={() => handleSeats(seat)}
                                key={seat.id}> {adicionaZeroAEsquerda(seat.name)} </S.SeatItem>
                        ))}
                    </S.SeatsContainer>

                    <S.CaptionContainer>
                        <S.CaptionItem>
                            <S.CaptionCircle color="#1AAE9E" border={"#0E7D71"} />
                            Selecionado
                        </S.CaptionItem>
                        <S.CaptionItem>
                            <S.CaptionCircle color="#C3CFD9" border={"#7B8B99"} />
                            Disponível
                        </S.CaptionItem>
                        <S.CaptionItem>
                            <S.CaptionCircle color="#FBE192" border={"#F7C52B"} />
                            Indisponível
                        </S.CaptionItem>
                    </S.CaptionContainer>

                    <S.FormContainer>

                        {seats.length >= 1 ? seats.map((seat, index) => (
                            <div style={{ textAlign: "left" }} key={index}>
                                {`Nome do Comprador ${index + 1}`}:
                                <input
                                    placeholder="Digite seu nome..."
                                    name="name"
                                    value={inputsConfig[index]?.name || ""}
                                    onChange={(event) => handleInput(event, index)}
                                    required
                                    data-test="client-name"
                                />

                                {`CPF do Comprador ${index + 1}`}:
                                <input
                                    placeholder="Digite seu CPF..."
                                    name="cpf"
                                    value={inputsConfig[index]?.cpf || ""}
                                    onChange={(event) => handleInput(event, index)}
                                    required
                                    data-test="client-cpf"
                                />
                            </div>
                        )) : <S.noSeatsContainer >Selecione um assento primeiro</S.noSeatsContainer>}
                        {pageConfig.serverError && <ErrorMessage message={pageConfig.serverError.message} />}
                        <button type="submit" onClick={handleFormSubmit} data-test="book-seat-btn">Reservar Assento(s)</button>

                    </S.FormContainer>

                    {pageConfig.seatInfo &&
                        <S.FooterContainer data-test="footer">
                            <div>
                                <img src={pageConfig.seatInfo.movie.posterURL} alt="poster" />
                            </div>
                            <div>
                                <p>{pageConfig.seatInfo.movie.title}</p>
                                <p>{`${pageConfig.seatInfo.day.weekday} - ${pageConfig.seatInfo.name}`}</p>
                            </div>
                        </S.FooterContainer>
                    }
                </S.PageContainer>
            }
        </>
    );
}


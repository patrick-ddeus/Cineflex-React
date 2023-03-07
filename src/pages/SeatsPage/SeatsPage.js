import styled from "styled-components";
import React from "react";
import MovieService from "../../services/movie.api";
import BodyPost from "../../services/body.post";
import Order from "../../services/order";
import { useParams, Link } from "react-router-dom";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { adicionaZeroAEsquerda } from "../../utils/utils";

export default function SeatsPage () {
    const [pageConfig, setPageConfig] = React.useState({
        seatInfo: null,
        loading: false,
        serverError: null
    });

    const [inputsConfig, setInputsConfigs] = React.useState({
        name: "",
        cpf: ""
    });

    const [seats, setSeats] = React.useState([]);

    const { sessionId } = useParams();

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


    function handleInput (event) {
        setInputsConfigs({ ...inputsConfig, [event.currentTarget.name]: [event.currentTarget.value] });
    }

    function handleSubmit () {
        const MovieApi = new MovieService();
        try {
            BodyPost.setBuyer(inputsConfig.name.join(""));
            BodyPost.setCPF(inputsConfig.cpf.join(""));
            BodyPost.setIds([...seats]);
            MovieApi.postSeat(BodyPost.getBodyPost());
            Order.setBuyerData(BodyPost.getBodyPost());
            Order.saveOrder();
        } catch (error) {
            setPageConfig({ ...pageConfig, serverError: error });
        }
    }

    function handleSeats (seat) {
        const existingSeat = seats.find(idStored => idStored === seat.id);
        if (!existingSeat && seat.isAvailable) {
            setSeats([...seats, seat.id]);
            Order.setSeatsData(seat);
        } else {
            const transformedSeats = seats.filter(idStored => idStored !== seat.id);
            setSeats(transformedSeats);
        }
    }

    return (
        <>
            {pageConfig.loading && <Loading />}
            {!pageConfig.loading && pageConfig.serverError ?
                <ErrorMessage message={"Theres a error in fetching data..."} />
                :
                <PageContainer>
                    Selecione o(s) assento(s)

                    <SeatsContainer>
                        {pageConfig.seatInfo && pageConfig.seatInfo.seats.map(seat => (
                            <SeatItem selected={seats.includes(seat.id)} available={seat.isAvailable} onClick={() => handleSeats(seat)} key={seat.id}>{adicionaZeroAEsquerda(seat.name)}</SeatItem>
                        ))}
                    </SeatsContainer>

                    <CaptionContainer>
                        <CaptionItem>
                            <CaptionCircle color="#1AAE9E" border={"#0E7D71"} />
                            Selecionado
                        </CaptionItem>
                        <CaptionItem>
                            <CaptionCircle color="#C3CFD9" border={"#7B8B99"} />
                            Disponível
                        </CaptionItem>
                        <CaptionItem>
                            <CaptionCircle color="#FBE192" border={"#F7C52B"} />
                            Indisponível
                        </CaptionItem>
                    </CaptionContainer>

                    <FormContainer>
                        Nome do Comprador:
                        <input
                            placeholder="Digite seu nome..."
                            name="name"
                            value={inputsConfig.name}
                            onChange={handleInput}
                        />

                        CPF do Comprador:
                        <input
                            placeholder="Digite seu CPF..."
                            name="cpf"
                            value={inputsConfig.cpf}
                            onChange={handleInput}
                        />
                        <Link to={"/sucesso"}>
                            <button onClick={handleSubmit}>Reservar Assento(s)</button>
                        </Link>
                    </FormContainer>

                    {pageConfig.seatInfo &&
                        <FooterContainer>
                            <div>
                                <img src={pageConfig.seatInfo.movie.posterURL} alt="poster" />
                            </div>
                            <div>
                                <p>{pageConfig.seatInfo.movie.title}</p>
                                <p>{`${pageConfig.seatInfo.day.weekday} - ${pageConfig.seatInfo.name}`}</p>
                            </div>
                        </FooterContainer>
                    }
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
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`;
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
        cursor:pointer;
    }
    input {
        width: calc(100vw - 60px);
    }
`;
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`;
const CaptionCircle = styled.div`
    border: 1px solid ${({ border }) => border};         // Essa cor deve mudar
    background-color: ${({ color }) => color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`;
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`;

const SeatItem = styled.div`
    ${({ available, selected }) => selected ? `
        border: 1px solid #0E7D71;
        background-color: #1AAE9E;
    ` : available ? `
        border: 1px solid #7B8B99;
        background-color: #C3CFD9;
    ` : `
        border: 1px solid #F7C52B;
        background-color: #FBE192;
    `}
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    cursor:pointer;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`;
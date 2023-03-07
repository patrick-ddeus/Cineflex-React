import styled from "styled-components";
import React from "react";
import MovieService from "../../service/movie.api";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage () {
    const [pageConfig, setPageConfig] = React.useState({
        sessionInfo: null,
        loading: false,
        serverError: null
    });
    const { id } = useParams();

    React.useEffect(() => {
        const MovieAPI = new MovieService();
        setPageConfig({ ...pageConfig, loading: true });

        async function fetchSessionData () {
            try {
                const sessionData = await MovieAPI.getSessionByMovieId(id);
                setPageConfig({ ...pageConfig, sessionInfo: sessionData, loading: false });

            } catch (error) {
                setPageConfig({ ...pageConfig, loading: false, serverError: error });
            }
        }

        fetchSessionData();
    }, []);

    return (
        <>
            {pageConfig.loading && <Loading />}
            {!pageConfig.loading && pageConfig.serverError ?
                <PageContainer>
                    <h2>{pageConfig.serverError}</h2>
                </PageContainer>
                :
                <PageContainer>
                    Selecione o horário
                    {pageConfig.sessionInfo && pageConfig.sessionInfo.days.map(session => (
                        <SessionContainer key={session.id}>
                            {`${session.weekday} - ${session.date}`}
                            <ButtonsContainer>
                                {session.showtimes.map(showtime => (
                                    <Link to={`/assentos/${showtime.id}`}>
                                        <button key={showtime.id}>{showtime.name}</button>
                                    </Link>
                                ))}
                            </ButtonsContainer>
                        </SessionContainer>
                    ))
                    }
                    {pageConfig.sessionInfo &&
                        <FooterContainer>
                            <div>
                                <img src={pageConfig.sessionInfo.posterURL} alt="poster" />
                            </div>
                            <div>
                                <p>{pageConfig.sessionInfo.title}</p>
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
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`;
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`;
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        cursor:pointer;
    }
    a {
        text-decoration: none;
    }
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


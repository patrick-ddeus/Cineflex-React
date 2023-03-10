import React from "react";
import MovieService from "../../services/movie.api";
import Order from "../../db/order";
import Loading from "../../components/Loading";
import { Link, useParams } from "react-router-dom";

import ErrorMessage from "../../components/ErrorMessage";
import * as S from "./styles"
export default function SessionsPage () {
    const [pageConfig, setPageConfig] = React.useState({
        sessionInfo: null,
        loading: false,
        serverError: null
    });
    const { id } = useParams();

    React.useEffect(() => {
        Order.order.seats = []
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

    function handleOrderCreate(sessionInfo, showtime){
        Order.setSessionData({...sessionInfo, showtimes: showtime})
        Order.setMovieData(pageConfig.sessionInfo)
        Order.saveOrder()
    }

    return (
        <>
            {pageConfig.loading && <Loading />}
            {!pageConfig.loading && pageConfig.serverError ?
                <ErrorMessage message={pageConfig.serverError.message}/>
                :
                <S.PageContainer>
                    Selecione o horário
                    {pageConfig.sessionInfo && pageConfig.sessionInfo.days.map(session => (
                        <S.SessionContainer key={session.id} data-test="movie-day">
                            {`${session.weekday} - ${session.date}`}
                            <S.ButtonsContainer>
                                {session.showtimes.map(showtime => (
                                    <Link to={`/assentos/${showtime.id}`} data-test="showtime" key={showtime.id} onClick={() => handleOrderCreate(session, showtime)}>
                                        <button>{showtime.name}</button>
                                    </Link>
                                ))}
                            </S.ButtonsContainer>
                        </S.SessionContainer>
                    ))
                    }
                    {pageConfig.sessionInfo &&
                        <S.FooterContainer data-test="footer">
                            <div>
                                <img src={pageConfig.sessionInfo.posterURL} alt="poster" />
                            </div>
                            <div>
                                <p>{pageConfig.sessionInfo.title}</p>
                            </div>
                        </S.FooterContainer>
                    }
                </S.PageContainer>
            }
        </>
    );
}



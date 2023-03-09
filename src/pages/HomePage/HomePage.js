import React from "react";
import { Link } from "react-router-dom";
import MovieService from "../../services/movie.api";
import Order from "../../db/order";

import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

import * as S from "./styles"
export default function HomePage () {
    const [pageConfig, setPageConfig] = React.useState({
        movieInfo: [],
        loading: false,
        serverError: null
    });

    React.useEffect(() => {
        const MovieAPI = new MovieService();
        setPageConfig({ ...pageConfig, loading: true });
        Order.resetOrder();

        async function fetchMovieList () {
            try {
                const movieData = await MovieAPI.getMovies();
                setPageConfig({ ...pageConfig, movieInfo: movieData, loading: false });
            } catch (error) {
                setPageConfig({ ...pageConfig, serverError: error, loading: false });
            }
        }
        fetchMovieList();
    }, []);

    return (
        <>
            {pageConfig.loading ? <Loading /> :
                !pageConfig.loading && pageConfig.serverError ?
                    <S.PageContainer>
                        <ErrorMessage message={pageConfig.serverError.message} />
                    </S.PageContainer>
                    :
                    < S.PageContainer >
                        Selecione o filme
                        < S.ListContainer >
                            {
                                pageConfig.movieInfo.map(movie => (
                                    <S.MovieContainer key={movie.id} data-test="movie">
                                        <Link to={`/sessoes/${movie.id}`}>
                                            <img src={movie.posterURL} alt="poster" />
                                        </Link>
                                    </S.MovieContainer>

                                ))
                            }
                        </S.ListContainer >

                    </S.PageContainer >
            }
        </>);
}



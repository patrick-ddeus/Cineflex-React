import React from "react";
import styled from "styled-components";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import MovieService from "../../services/movie.api";
import Order from "../../services/order";

import ErrorMessage from "../../components/ErrorMessage";
export default function HomePage () {
    const [pageConfig, setPageConfig] = React.useState({
        movieList: localStorage.getItem("movies") || [],
        loading: false,
        serverError: null
    });

    React.useEffect(() => {
        const MovieAPI = new MovieService();
        setPageConfig({ ...pageConfig, loading: true });
        Order.resetOrder()

        async function fetchMovieList () {
            try {
                const asyncMovieList = await MovieAPI.getMovies("/movies");
                setPageConfig({ ...pageConfig, movieList: asyncMovieList, loading: false });
            } catch (error) {
                setPageConfig({ ...pageConfig, serverError: error, loading: false });
            }
        }
        localStorage.setItem("order", {})
        fetchMovieList();
    }, []);

    return (
        <>
            {pageConfig.loading && <Loading />}

            {!pageConfig.loading && pageConfig.serverError ?
                <PageContainer>
                    <ErrorMessage message={"Error in fetching data..."}/>
                </PageContainer>
                :
                < PageContainer >
                    Selecione o filme
                    < ListContainer >
                        {
                            pageConfig.movieList.map(movie => (
                                <MovieContainer key={movie.id}>
                                    <Link to={`/sessoes/${movie.id}`}>
                                        <img src={movie.posterURL} alt="poster" />
                                    </Link>
                                </MovieContainer>

                            ))
                        }
                    </ListContainer >

                </PageContainer >
            }
        </>);
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
    padding-top: 70px;
`;
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`;
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`;


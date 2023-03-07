import React from "react";
import styled from "styled-components";
import Loading from "../../assets/loading.gif";
import { Link } from "react-router-dom";
import MovieService from "../../service/movie.api";

export default function HomePage () {
    const [pageConfig, setPageConfig] = React.useState({
        movieList: localStorage.getItem("movies") || [],
        loading: false,
        serverError: null
    });

    React.useEffect(() => {
        const MovieAPI = new MovieService();
        setPageConfig({ ...pageConfig, loading: true });

        async function fetchMovieList () {
            try {
                const asyncMovieList = await MovieAPI.getMovies("/movies");
                setPageConfig({ ...pageConfig, movieList: asyncMovieList, loading: false });
            } catch (error) {
                setPageConfig({ ...pageConfig, serverError: error, loading: false });
            }
        }

        fetchMovieList();
    }, []);

    return (
        <>
            {
                pageConfig.loading && (
                    <LoadingContainer>
                        <img src={Loading} alt="" />
                    </LoadingContainer>)
            }

            {!pageConfig.loading && pageConfig.serverError ?
                <PageContainer>
                    <h2>{pageConfig.serverError}</h2>
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

const LoadingContainer = styled.div`
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
`;
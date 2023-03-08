import React from 'react';
import { NavContainer } from './styles';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header ({ logo }) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <NavContainer>
            {logo}
            {location.pathname !== "/" && <IoArrowBackOutline onClick={() => navigate(-1)} data-test="go-home-header-btn"/>}
        </NavContainer>
    );
}

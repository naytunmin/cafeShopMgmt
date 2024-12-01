import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const LinkButton = ({ data }) => {
    const navigate = useNavigate();
    const handleClick = (event) => {

        const cafeshopName = data.name;
        sessionStorage.setItem('cafeshopName', cafeshopName);
        event.preventDefault();
        navigate('/employee'); 
    };

    return (
        <a href="#" onClick={handleClick}>
            {data.employeeCount}
        </a>
    );
};

export default LinkButton;

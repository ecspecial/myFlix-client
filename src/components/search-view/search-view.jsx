import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"

export const SearchView = ({ movies, onSearch, setSearchResult }) => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearchSubmit = () => {
        if (inputValue) {
            onSearch(inputValue);
            navigate(`/search`);
            setInputValue("");
        } else {
            alert("Please enter some text");
        }

    }

    return (
        <div className="d-flex">
            <div className="d-inline-flex">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search search-bar"
                    value={inputValue}
                    onChange={handleChange}
                />
                <button type="submit" onClick={() => {
                    handleSearchSubmit()
                }}>Search</button>
            </div>
        </div>
    );
};
import React, { useState } from "react";

export const LoginView = ({onLoggedIN}) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };
        
        fetch("https://myflixdb-ecspecial-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIN(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Authentication proccess failed")
        });
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>
            <label>
                Password
                <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
};
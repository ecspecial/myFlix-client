import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/userActions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

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
            //console.log("Login response: ", data);
            if(data.user) {
                // console.log(data.user);
                // console.log(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                dispatch(setUser(data.user, data.token));
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Authentication proccess failed")
        });
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="forUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                />
            </Form.Group>

            <Form.Group controlId="forPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
};
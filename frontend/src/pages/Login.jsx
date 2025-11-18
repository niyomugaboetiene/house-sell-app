import { useState } from "react";
import axios from "axios";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div>
                <label>User name</label>
                <input type="text" onChange={() => {}} />
            </div>
        </div>
    )
}
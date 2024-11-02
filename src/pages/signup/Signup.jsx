import React, { useContext, useState } from 'react'
import "./signup.scss"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const { dispatch } = useContext(AuthContext);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: user });
                navigate('/');
                setError(false);
            })
            .catch((error) => {
                setError(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <div className="signup">
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Signup</button>
                <div className='account'>Already have an account?
                    <span className='span' onClick={() => navigate('/login')}>Login</span>
                </div>
                {error && <span className='error'>Wrong credentials!</span>}
            </form>
        </div>
    )
}

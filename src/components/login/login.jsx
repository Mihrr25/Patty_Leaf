import React, { useState, useContext, useEffect } from 'react';
import './loginStyles.css';
import { Link, useNavigate, redirectDocument, json } from 'react-router-dom'
import { mycontext } from "../../context";
import bcrypt from 'bcryptjs';
const saltRounds = 10;
const login = () => {
    const myctxt = useContext(mycontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setInorrect] = useState(false);
    const [fuser, setFUser] = useState(true);
    async function comparePasswords(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            return match; // true or false
        } catch (error) {
            console.error('Error while comparing passwords:', error);
            throw error;
        }
    }
    const handleSubmit = (e) => {
        setInorrect(false)
        setFUser(true)
        console.log("clicked");
        e.preventDefault();
        (async function myf() {
            let x = await fetch('http://localhost:5000/api/fetchuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });
            let a = await x.json();
            if (!a) {
                setFUser(false);
            }
            else {
                let fin= await comparePasswords(password,a.password);
                if(!fin){
                    setInorrect(true);
                }
                else {
                    let myobj={
                        username:a.username,
                        cart:a.cart,
                        orders:a.order
                    }

                    await myctxt.setCurrentUser(myobj);
                    localStorage.setItem('pUser',JSON.stringify(myobj));
                    window.location = "/";
                }
            }

        })();
    };
    return (
        <>
            <div className="login-form">
                <h2>Log in to order your food</h2>
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {!fuser ? (<p className='incorrect'>Username Not Found</p>) : ("")}
                            <input className='input' type="text"
                                name="userName"
                                id="userName"
                                placeholder="Username"
                                autoComplete="on"
                                autoFocus
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group">
                            {incorrect ? (<p className='incorrect'>Wrong Password</p>) : ("")}
                            <input className='input'
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>

                        <div className="feed-btn-c">
                            <button type="submit" className='feedBtn'>Submit</button>
                            <Link to="http://localhost:5173/sighin"><button className='feedBtn1'>Sign In</button></Link>
                        </div>
                    </form>
                </div>
                <hr className='hr1' />
                <footer>
                    All rights reserved © 2024 Patty Leaf Restaurant. Designed with passion.
                </footer>
            </div></>
    )
}

export default login
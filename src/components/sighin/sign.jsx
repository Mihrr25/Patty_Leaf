import React, { useState, useContext, useEffect } from 'react';
import './sighStyles.css';
import { Link, useNavigate, redirectDocument, json } from 'react-router-dom'
import { mycontext } from "../../context";
import bcrypt from 'bcryptjs';
const saltRounds = 10;
const sign = () => {
    const myctxt = useContext(mycontext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const [notMatch, setNotMatch] = useState(false);
    const [fuser, setFUser] = useState(true);
    async function hashPassword(pswd) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(pswd, salt);
            return hashedPassword;
        } catch (error) {
            console.error('Error while hashing password:', error);
            throw error;
        }
    }

    async function handleChangeinUser(e) {
        let currentId = e.target.value;
        setUsername(currentId);
        try {
            let response = await fetch('http://localhost:5000/api/fetchuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: currentId })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();
            console.log(data);
            if (data) {
                setFUser(false);
                console.log(data);
            } else {
                setFUser(true);
            }
        } catch (error) {
        }
    }
    useEffect(() => {
        if (cPassword != password) {
            setNotMatch(true)
        }
        else {
            setNotMatch(false);
        }

    }, [password, cPassword])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fuser || notMatch) return;

        console.log("fetching..");

        try {
            let newpas = await hashPassword(password);
            console.log(newpas);

            let x = await fetch('http://localhost:5000/api/createuser', {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, newpas })
            });

            let a = await x.json();
            console.log("creating");

            let myobj={
                username:a.username,
                cart:a.cart,
                orders:a.order
            }

            await myctxt.setCurrentUser(myobj);
            localStorage.setItem('pUser', JSON.stringify(myobj));
            window.location = "/";
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <>
            <div className="sign-form">
                <h2>Sigh in to order your food</h2>
                <div className="sign-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {!fuser ? (<p className='incorrect'>Username Not Found</p>) : ("")}
                            <input className='input'
                                type="text"
                                name="userName"
                                id="userName"
                                placeholder="Username"
                                autoComplete="on"
                                autoFocus
                                required
                                value={username}
                                onChange={handleChangeinUser} />
                        </div>
                        <div className="form-group">
                            <input className='input'
                                type="password"
                                name="password"
                                id="Password"
                                placeholder="Password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            {notMatch ? (<p className='incorrect'>Passwords Not Matched</p>) : ("")}
                            <input className='input'
                                type="password"
                                name="cPassword"
                                id="cPassword"
                                placeholder="Confirm Password"
                                autoComplete="current-password"
                                required
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                            />
                        </div>

                        <div className="feed-btn-c">
                            <button type="submit" className='feedBtn'>Submit</button>
                            <Link to="/login"><button className='feedBtn1'>Log In</button></Link>
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

export default sign
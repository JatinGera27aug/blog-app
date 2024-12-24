import React from "react";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
    const navigate = useNavigate();

    // Randomized motivational quotes
    const quotes = [
        "Dream big, start small, but most of all, start.",
        "Success is not final; failure is not fatal. It is the courage to continue that counts.",
        "Your journey isn’t over. Log back in and continue where you left off.",
        "You can do It bro, nothing expires permanently",
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
        }}>
            <h1>Your session has expired.</h1>
            <p>{randomQuote}</p>
            <button
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
                onClick={() => navigate("/login")}
            >
                Log In Again
            </button>
        </div>
    );
};

export default SessionExpired;

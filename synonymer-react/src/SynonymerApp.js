import React, { useState, useEffect } from 'react';
import './style.css'; 

function SynonymerApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
        setHistory(storedHistory);
    }, []);

    const fetchDefinitions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDefinitions(data);
            updateHistory(searchTerm);
        } catch (error) {
            console.error('Error fetching definitions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchDefinitions();
    };

    const updateHistory = (newTerm) => {
        const updatedHistory = [newTerm, ...history.filter(term => term !== newTerm)].slice(0, 10);
        setHistory(updatedHistory);
        localStorage.setItem('history', JSON.stringify(updatedHistory));
    };

    const handleHistoryClick = (term) => {
        setSearchTerm(term);
        fetchDefinitions();
    };

    return (
        <div className="app">
            <div className="sidebar">
                <h2>Search History:</h2>
                <ul>
                    {history.map((term, index) => (
                        <li key={index} onClick={() => handleHistoryClick(term)}>
                            {term}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container">
                <h1>Dictionary Application</h1>
                <div className='search-section'>
                    <input 
                        type="text" 
                        placeholder="Search for word definitions (1 word only)..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button onClick={handleSearch}>Search</button>
                    {loading && <p className="loading">Loading...</p>}
                </div>
                <div className="definitions">
                    {definitions.length > 0 && (
                        <div>
                            <h2>Definitions:</h2>
                            <ul>
                                {definitions.map((entry, index) => (
                                    <li key={index}>
                                        <strong>{entry.word}</strong>: {entry.meanings[0].definitions[0].definition}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {!loading && definitions.length === 0 && (
                        <p className="no-definitions">No definitions found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SynonymerApp;
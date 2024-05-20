import React, { useState } from 'react';
import './style.css'; 

function SynonymerApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDefinitions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDefinitions(data);
        } catch (error) {
            console.error('Error fetching definitions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchDefinitions();
    };

    return (
        <div className="container">
            <h1>Dictionary Application</h1>
            <input 
                type="text" 
                placeholder="Search for word definitions (1 word only)..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            {loading && <p className="loading">Loading...</p>}
            {definitions.length > 0 && (
                <div className="definitions">
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
    );
}

export default SynonymerApp;

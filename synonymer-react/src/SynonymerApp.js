import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; 

function SynonymerApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [translatedDefinitions, setTranslatedDefinitions] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('sv'); // Default to Swedish

    useEffect(() => {
        // Load history from sessionStorage on component mount
        const storedHistory = JSON.parse(sessionStorage.getItem('history')) || [];
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
            setTranslatedDefinitions([]); // Clear previous translations
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
        sessionStorage.setItem('history', JSON.stringify(updatedHistory));
    };

    const handleHistoryClick = (term) => {
        setSearchTerm(term);
        fetchDefinitions();
    };

    const translateDefinitions = async () => {
        try {
            const translations = await Promise.all(definitions.map(async (entry) => {
                const response = await axios.post('https://libretranslate.de/translate', {
                    q: entry.meanings[0].definitions[0].definition,
                    source: 'en',
                    target: selectedLanguage, // Use the selected language
                    format: 'text'
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                return {
                    word: entry.word,
                    translatedDefinition: response.data.translatedText
                };
            }));
            setTranslatedDefinitions(translations);
        } catch (error) {
            console.error('Error translating definitions:', error);
        }
    };

    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    const handleTranslate = () => {
        translateDefinitions();
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
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="sv">Swedish</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="en">English</option>
            </select>
            <button onClick={handleTranslate} disabled={definitions.length === 0}>Translate</button>
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
            {translatedDefinitions.length > 0 && (
                <div className="translated-definitions">
                    <h2>Translated Definitions:</h2>
                    <ul>
                        {translatedDefinitions.map((entry, index) => (
                            <li key={index}>
                                <strong>{entry.word}</strong>: {entry.translatedDefinition}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {!loading && definitions.length === 0 && (
                <p className="no-definitions">No definitions found.</p>
            )}
            <div className="history">
                <h2>Search History:</h2>
                <ul>
                    {history.map((term, index) => (
                        <li key={index} onClick={() => handleHistoryClick(term)}>
                            {term}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SynonymerApp;

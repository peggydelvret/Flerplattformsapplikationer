import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; 

function DictionaryApp() {
    // State hooks, hanterar komponentera i react
    const [searchTerm, setSearchTerm] = useState(''); // Söktermen 
    const [definitions, setDefinitions] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [history, setHistory] = useState([]); // Sökhistorik
    const [translatedDefinitions, setTranslatedDefinitions] = useState([]); // Översatter definitioner
    const [selectedLanguage, setSelectedLanguage] = useState(''); // Väljer språk

    // Ladda historik från sessionStorage
    useEffect(() => {
        const storedHistory = JSON.parse(sessionStorage.getItem('history')) || [];
        setHistory(storedHistory);
    }, []);

    // Hamtar data från dictionary API
    const fetchDefinitions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setDefinitions(data); 
            updateHistory(searchTerm); // Uppdaterar sökhistoriken
            setTranslatedDefinitions([]); 
        } catch (error) {
            console.error('Error fetching definitions:', error);
        } finally {
            setLoading(false);
        }
    };

    // Sökningen
    const handleSearch = () => {
        const searchTermLowerCase = searchTerm.toLowerCase(); // alla sökningar blir små bokstäver
        setSearchTerm(searchTermLowerCase); 
        fetchDefinitions();
        setSearchTerm('');
    };

    // Uppdaterar historiken i sessionStorage
    const updateHistory = (newTerm) => {
        const newTermLowerCase = newTerm.toLowerCase();
        const updatedHistory = [newTermLowerCase, ...history.filter(term => term !== newTermLowerCase)].slice(0, 10);
        setHistory(updatedHistory);
        sessionStorage.setItem('history', JSON.stringify(updatedHistory));
    };

    // Kan klicka på historik och få upp ordet
    const handleHistoryClick = (term) => {
        setSearchTerm(term);
        fetchDefinitions();
    };

    // Funktion för att översätta definitionerna 
    const translateDefinitions = async () => {
        try {
            const translations = await Promise.all(definitions.map(async (entry) => {
                const response = await axios.get('https://api.mymemory.translated.net/get', {
                    params: {
                        q: entry.meanings[0].definitions[0].definition,
                        langpair: `en|${selectedLanguage}`
                    }
                });
                return {
                    word: entry.word,
                    translatedDefinition: response.data.responseData.translatedText
                };
            }));
            setTranslatedDefinitions(translations); // språkväljare
        } catch (error) {
            console.error('Error translating definitions:', error);
        }
    };

    // Ändra språk
    const handleLanguageChange = (e) => {
        setSelectedLanguage(e.target.value);
    };

    // funktion för att översätta
    const handleTranslate = () => {
        translateDefinitions();
    };

    // Översätter första definitionen
    const getTranslatedDefinition = (word) => {
        const translation = translatedDefinitions.find(t => t.word === word);
        return translation ? translation.translatedDefinition : '';
    };

    // Hemsidans innehåll
    return (
        <div className="container">
            <h1>Dictionary Application</h1>
            <input 
                type="text" 
                placeholder="Search for ONE word definitions" 
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
                                <br />
                                <p><i>Translation ({selectedLanguage}):</i> {getTranslatedDefinition(entry.word)}</p>
                            </li>
                        ))}
                    </ul>
                    <div className='language-translate'>
                        <select value={selectedLanguage} onChange={handleLanguageChange}>
                            <option value="">Choose language...</option>
                            <option value="sv">Swedish</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                            <option value="it">Italian</option>
                        </select>
                        <button onClick={handleTranslate} disabled={definitions.length === 0}>Translate</button>
                    </div>
                </div>
            )}
            {!loading && definitions.length === 0 && (
                <p className="no-definitions">No definitions found.</p>
            )}
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
        </div>
    );
}

export default DictionaryApp;

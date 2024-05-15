import React from "react";
import Word from "./Word";

export default function WordList() {
    return (
        <div>
            <input className="search-bar" placeholder="Ett engelskt ord..." />
            <button title="Sök">Sök</button>

        </div>
    )
}
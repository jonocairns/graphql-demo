import React from 'react';
import './App.css';

export const Layout: React.FC = ({children}) => (
    <div className="App">
        <header className="App-header">
            {children}
        </header>
    </div>
);
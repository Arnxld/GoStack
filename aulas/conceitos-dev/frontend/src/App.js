import React, {useState} from 'react'

import "./App.css"
import backgroundImage from './assets/background.jpeg'

import Header from './components/Header'

/**
 * Componente
 * Propriedade
 * Estado
 */

function App() {
    const [projects, setProjects] = useState(['Desenvolvimento de App', 'Front-end Web'])

    function handleAddProject() {
        // projects.push(`Novo projeto ${Date.now()}`)
        
        setProjects([...projects, `Novo projeto ${Date.now()}`])
        
    }

    return (
        <>
            <Header title='Projects' />

            <img src={backgroundImage} alt=""/>

            <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    )
}

export default App
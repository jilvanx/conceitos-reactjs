import React, { useEffect, useState } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const res = await api.post('repositories', 
      {
        title: "Desafio Reactjs - Adicionado pelo Reactjs",
        url: "https://jilvanx.github.io/",
        techs: ["Node.js", "reactjs", "RN"],
        likes: 0
      }
    );

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  useEffect(() => {
    api.get('repositories').then(
      res => setRepositories(res.data)
    );
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map(repository => 
            <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

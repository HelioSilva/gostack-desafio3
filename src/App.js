import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [repos, setRepos] = useState([]);
  useEffect(() => {
    handleLoadRepos();
  }, []);

  async function handleLoadRepos() {
    const response = await api.get("repositories");
    setRepos(response.data);
  }

  async function handleAddRepository() {
    (async () => {
      const response = await api.post("repositories", {
        title: inputTitle,
        url: "localhost:333330",
        techs: ["uiii", "oii"],
      });

      setRepos([...repos, response.data]);
      setInputTitle("");
    })();
  }

  async function handleRemoveRepository(id) {
    (async () => {
      await api.delete(`repositories/${id}`);
      const index = repos.findIndex((item) => item.id === id);
      if (index > -1) {
        const [...oldRepos] = repos;
        oldRepos.splice(index, 1);
        setRepos(oldRepos);
      }
    })();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <input
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        name="campo"
      ></input>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

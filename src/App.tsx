import { useState, useEffect } from "react";
// import { Routes, Route } from 'react-router-dom';
import {NavBar} from './components/Navbar';
import { Navbar, NavbarBrand } from "react-bootstrap";


interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

export default function App() {
  
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    try {
      const tarefasSalvas = localStorage.getItem("tarefasSalvas");
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    } catch (error) {
      console.error("Failed to load tasks from local storage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tarefasSalvas", JSON.stringify(tarefas));
    } catch (error) {
      console.error("Failed to save tasks to local storage:", error);
    }
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (titulo.trim()) {
      const novaTarefa: Tarefa = {
        id: Date.now(),
        titulo,
        isDone: false,
        isFavorate: false,
      };
      setTarefas((prev) => [...prev, novaTarefa]);
      setTitulo("");
    }
  };

  const alternarTarefa = (id: number) => {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, isDone: !tarefa.isDone } : tarefa
      )
    );
  };
  const favoritarTarefa = (id: number) => {
    setTarefasFavoritas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, isFavorate: !tarefa.isFavorate } : tarefa
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      adicionarTarefa();
    }
  };

  return (
    <><Navbar /><div className="min-h-screen min-w-screen bg-gray-100 flex items-center justify-center p-6 font-inter">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Lista de Tarefas
        </h1>


        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nova tarefa..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 text-gray-800 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Adicionar
          </button>
        </div>


        {tarefas.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhuma tarefa adicionada.</p>
        ) : (
          <ul className="space-y-2">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center text-gray-800 gap-3 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
              >
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarTarefa(tarefa.id)}
                  className="h-5 w-5 rounded-md appearance-none border-2 border-gray-400 checked:bg-blue-600 checked:border-blue-600 cursor-pointer transition-all duration-200" />
                <span
                  className={`flex-1 transition-all duration-200 ${tarefa.concluida ? "line-through text-gray-400" : ""}`}
                >
                  {tarefa.titulo}
                </span>
                <button
                  onClick={() => favoritarTarefa(tarefa.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label={`Deletar tarefa: ${tarefa.titulo}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div></>
  );
}
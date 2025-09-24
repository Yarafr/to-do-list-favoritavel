export const FavoritesProvider = ( { children }: FavoritesProviderProps ) => {
  const [favorites, setFavorites] = useState <Array<setTarefasFavoritas>>(() => {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
  });

  const addFav = (setTarefasFavoritas: Tarefa) => {
      setFavorites(prev => {
          const updated = [...prev, setTarefasFavoritas];
          localStorage.setItem('favorites', JSON.stringify(updated));
          return updated;
      });
  };

  const removerFav = (indice: number) => {
      setFavorites(prev => {
          const updated = prev.filter((_, i) => i !== indice);
          localStorage.setItem('favorites', JSON.stringify(updated));
          return updated;
      });
  };

  const show = (): Array<Tarefa> => {     
      return favorites;
  }

  return (
      <FavoritesContext.Provider value={{ favorites, addFav, removerFav, show }}>
          {children}
      </FavoritesContext.Provider>
  );
}

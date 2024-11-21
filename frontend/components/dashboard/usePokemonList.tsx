import React from "react";

export function usePokemonList(
  niches: { id: number; slug: string; name: string }[],
) {
  const [items, setItems] = React.useState<
    { id: number; slug: string; name: string }[]
  >([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const limit = 10;

  const loadPokemon = async (currentOffset: number) => {
    try {
      setIsLoading(true);
      if (currentOffset > 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      const filteredItems = niches.slice(currentOffset, currentOffset + limit);

      setHasMore(filteredItems.length !== 0);
      setItems((prevItems) => [...prevItems, ...filteredItems]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadPokemon(offset);
  }, [niches]);

  const onLoadMore = () => {
    const newOffset = offset + limit;

    setOffset(newOffset);
    loadPokemon(newOffset);
  };

  return {
    items,
    hasMore,
    isLoading,
    onLoadMore,
  };
}

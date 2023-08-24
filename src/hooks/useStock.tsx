import React, {useState, useEffect} from 'react'


interface SearchResult {
    symbol: string;
    name: string;
  }
  
  interface PortfolioItem {
    id: number;
    symbol: string;
    name: string;
  }

const useStock = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  const handleSearch = async (query: string) => {
    if (query) {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=YOUR_ALPHAVANTAGE_API_KEY`
        );

        if (response.ok) {
          const data = await response.json();
          const results: SearchResult[] = data.bestMatches.map(
            (match: any) => ({
              symbol: match["1. symbol"],
              name: match["2. name"]
            })
          );
          setSearchResults(results);
        } else {
          console.error("Error fetching search results:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const storedPortfolios = localStorage.getItem('portfolios');
    if (storedPortfolios) {
      setPortfolio(JSON.parse(storedPortfolios));
    }
  }, []);

  const addToPortfolio = (stock: any) => {
    const newPortfolioItem: PortfolioItem = {
      ...stock,
      id: portfolio.length + 1
    };
    setPortfolio([...portfolio, newPortfolioItem]);
    setSearchResults([]);
    localStorage.setItem('portfolios', JSON.stringify([...portfolio, newPortfolioItem]))
  };

  const removeFromPortfolio = (id: number) => {
    const updatedPortfolio = portfolio.filter((item) => item.id !== id);
    setPortfolio(updatedPortfolio);
    localStorage.setItem('portfolios', JSON.stringify(updatedPortfolio));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    handleSearch(query);
  };

  return {
     addToPortfolio, removeFromPortfolio, handleInputChange, searchTerm, searchResults,portfolio
  }
}

export default useStock
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";



const SearchBar: React.FC = () => {
  const { addToPortfolio, removeFromPortfolio, handleInputChange, searchTerm, searchResults,portfolio
  } = useStock()
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//   const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

//   const handleSearch = async (query: string) => {
//     if (query) {
//       try {
//         const response = await fetch(
//           `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=YOUR_ALPHAVANTAGE_API_KEY`
//         );

//         if (response.ok) {
//           const data = await response.json();
//           const results: SearchResult[] = data.bestMatches.map(
//             (match: any) => ({
//               symbol: match["1. symbol"],
//               name: match["2. name"]
//             })
//           );
//           setSearchResults(results);
//         } else {
//           console.error("Error fetching search results:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   useEffect(() => {
//     const storedPortfolios = localStorage.getItem('portfolios');
//     if (storedPortfolios) {
//       setPortfolio(JSON.parse(storedPortfolios));
//     }
//   }, []);

//   const addToPortfolio = (stock: any) => {
//     const newPortfolioItem: PortfolioItem = {
//       ...stock,
//       id: portfolio.length + 1
//     };
//     setPortfolio([...portfolio, newPortfolioItem]);
//     setSearchResults([]);
//     localStorage.setItem('portfolios', JSON.stringify([...portfolio, newPortfolioItem]))
//   };

//   const removeFromPortfolio = (id: number) => {
//     const updatedPortfolio = portfolio.filter((item) => item.id !== id);
//     setPortfolio(updatedPortfolio);
//     localStorage.setItem('portfolios', JSON.stringify(updatedPortfolio));
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const query = event.target.value;
//     setSearchTerm(query);
//     handleSearch(query);
//   };

  return (
    <div className="py-10 flex flex-col items-center justify-center w-full">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={handleInputChange}
          className="h-14 w-full lg:w-1/2 text-center rounded-md outline-none"
        />
        <div className="w-full pt-8">
          {searchResults.map((stock) => (
            <div key={stock.symbol} className="my-3 flex flex-col md:flex-row item-center justify-between">
              <p className="text-grey-500 text-lg">{stock.symbol}</p>
              <p className="text-grey-500 text-lg">{stock.name}</p>
              <button className="bg-slate-800 hover:bg-slate-900 px-3 py-2 text-[white] rounded-md" onClick={() => addToPortfolio(stock)}>Add Button</button>
            </div>
          ))}
        </div>
        <div className="py-10 flex flex-col items-center w-full">
          <h2 className="text-2xl font-semibold text-slate-800">Portfolio</h2>
          <div className="my-5 w-full">
            <table className="w-full h-1/2">
              <thead className="bg-slate-800  h-10 md:h-16">
                <tr>
                  <th className="text-[white] text-base md:text-xl">Symbol</th>
                  <th className="text-[white] text-base md:text-xl">Company Name</th>
                  <th className="text-[white] text-base md:text-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {portfolio?.map((item) => (
                  <tr key={item.id} className="py-14">
                    <td className="text-center py-2">
                      <Link to={`/portfolio/${item.symbol}`}>{item.symbol}</Link>
                    </td>
                    <td className="text-center py-2">{item.name}</td>
                    <td className="text-center py-2">
                      <button className="bg-slate-800 hover:bg-slate-900 text-white shadow-sm px-3 py-2 rounded-md text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => removeFromPortfolio(item.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
  );
};

export default SearchBar;

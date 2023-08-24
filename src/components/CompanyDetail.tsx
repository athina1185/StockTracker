import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface RouteParams {
  symbol: string;
  [key: string]: string;
}

interface CompanyInfo {
  name: string;
  address: string;
  marketCap: string;
  description: string;
}

const CompanyDetail: React.FC = () => {
  const { symbol } = useParams<RouteParams>();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  const navigate = useNavigate();

  const fetchCompanyInfo = async (symbol: string) => {
    const apiKey = "W123DACX51LI3EVS";
    const overviewUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`;
    // console.log(overviewUrl);
    try {
      const response = await fetch(overviewUrl);
      const data = await response.json();

      const companyInfo: CompanyInfo = {
        name: data.Name,
        address: data.Address,
        marketCap: data.MarketCapitalization,
        description: data.Description
      };

      setCompanyInfo(companyInfo);
    } catch (error) {
      console.error("Error fetching company information:", error);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchCompanyInfo(symbol);
    }
  }, [symbol]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="pt-5 md:py-8 flex flex-col md:flex-row justify-between item-center gap-5 md:gap-0">
        <button className="font-medium text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md" onClick={handleBack}> {'< '}Back</button>
        <h2 className="text-lg text-slate-800 pl-10 md:pr-14 font-bold text-center items-center">Company Details</h2>
        <h1></h1>
      </div>
    <div className="py-5">
        {companyInfo ? (
          <div className="flex flex-col gap-5">
            <p className="text-md ">Name: {companyInfo.name}</p>
            <p className="text-md ">Address: {companyInfo.address}</p>
            <p className="text-md ">Market Cap: {companyInfo.marketCap}</p>
            <p className="text-md ">Description: {companyInfo.description}</p>
          </div>
        ) : (
          <div className="flex justify-center item-center">
            <p className="text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;

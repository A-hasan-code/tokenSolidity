// src/App.js
import React, { useState, useEffect } from "react";
import { getWeb3, getContract } from "./web3";

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState(0);
  const [burnAmount, setBurnAmount] = useState(0);
  const [isTokenAdded, setIsTokenAdded] = useState(false);

  const tokenAddress = "0x44812a3c8256c80129e0Ed30eDFb0C0FDEaBd8Fb"; 
  const tokenSymbol = "USDT"; // Token symbol
  const tokenDecimals = 18; // Token decimals (18 for most ERC-20 tokens)
  const tokenImage = "TOKEN_IMAGE_URL"; // Optional image URL for the token icon

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(accounts => {
        setAccount(accounts[0]);
        loadBalance(accounts[0]);
      });
    }
  }, []);

  const loadBalance = async (address) => {
    const web3 = getWeb3();
    const contract = getContract();
    const balance = await contract.methods.balanceOf(address).call();
    setBalance(web3.utils.fromWei(balance, "ether"));
  };

 

  const handleBurn = async () => {
    const web3 = getWeb3();
    const contract = getContract();
    const amount = web3.utils.toWei(burnAmount.toString(), "ether");

    try {
      await contract.methods.burn(amount).send({ from: account });
      loadBalance(account);
    } catch (err) {
      console.error("Error burning tokens:", err);
    }
  };

  const handleAddTokenToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const result = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
              image: tokenImage, // Optional: Add an image URL for the token
            },
          },
        });

        if (result) {
          setIsTokenAdded(true);
          alert("Token added to wallet!");
        } else {
          alert("Token addition failed!");
        }
      } catch (error) {
        console.error("Error adding token to MetaMask:", error);
        alert("Error adding token to MetaMask");
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };
  // Handle minting the default 1 million tokens
  const handleMint = async () => {
    const web3 = getWeb3();
    const contract = getContract();

    const amount = web3.utils.toWei("1000000", "ether"); // 1 million tokens with 18 decimals

    try {
      await contract.methods.mint(account, amount).send({ from: account });
      loadBalance(account);  // Reload the balance after minting
    } catch (err) {
      console.error("Error minting tokens:", err);
    }
  };
  return (
    <div className="App">
    <h1>FlashUsdt Token Interaction</h1>

    {account ? (
      <div>
        <p>Connected Account: {account}</p>
        <p>Balance: {balance} USDT</p>

        <div>
          <h3>Mint 1 Million Tokens</h3>
          <button onClick={handleMint}>Mint 1 Million Tokens</button>
        </div>

        <div>
          <h3>Burn Tokens</h3>
          <input
            type="number"
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
            placeholder="Amount to Burn"
          />
          <button onClick={handleBurn}>Burn</button>
        </div>

        <div>
          <h3>Add Token to MetaMask</h3>
          <button onClick={handleAddTokenToMetaMask}>
            {isTokenAdded ? "Token Added" : "Add Token to Wallet"}
          </button>
        </div>
      </div>
    ) : (
      <p>Please connect your MetaMask wallet.</p>
    )}
  </div>
  );
}

export default App;

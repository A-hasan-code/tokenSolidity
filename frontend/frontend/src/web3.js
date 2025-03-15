// src/web3.js
import Web3 from "web3";
import { abi, address } from "./contract";

const web3 = new Web3(window.ethereum); 

export const getWeb3 = () => web3;

export const getContract = () => {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};

import { ethers } from 'ethers';
import { erc20Contract } from '../../data/ethContractTypes';

// Create provider
//TODO: potentially add default provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

/**
 * @func createContract creates an instance of a new ethers contract interface
 * @param {address} contract address 
 * @param {type} contract type determines abi
 * @returns {object} new contract interface
 */
function createContract (address, type) {
  let abi;
  switch (type) {
    case 'erc20': 
      abi = erc20Contract;
      break;
    default: abi = erc20Contract;
    }
  const newContract = new ethers.Contract(address, abi, provider);
  return newContract;
}

/**
 * @func getBalance retrieves balance of an ethereum account's tokens and stakes
 * @param {account} user account for which balance is requested
 * @param {contract} token contract (optional - defaults to Eth)
 * @returns {string} account balance
 */

 //TODO: won't work for yield farming
async function getTokenBalance (account, contract) {
  if (!contract) {
    const balance = await provider.getBalance(account);
    return Number(ethers.utils.formatEther(balance));
  } else {
    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(account);
    return Number(ethers.utils.formatUnits(balance, decimals));
  }
}

export {
  createContract,
  getTokenBalance,
}
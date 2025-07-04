import { ethers } from 'ethers';
import Arisan from '../abis/Arisan.json';

export const joinSmartContract = async (contractAddress) => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask tidak terdeteksi!');
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Arisan.abi, signer);

  const tx = await contract.join();
  await tx.wait();

  return tx.hash;
};

export const payArisanSmartContract = async (contractAddress) => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask tidak terdeteksi!');
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.BrowserProvider(window.ethereum); // ethers v6
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Arisan.abi, signer);

  const tx = await contract.pay({
    value: ethers.parseEther("0.01") // sesuai nilai fee di contract Solidity
  });

  await tx.wait();

  return tx.hash;
};

export async function drawArisanSmartContract(contractAddress) {
  if (!window.ethereum) throw new Error('Metamask tidak tersedia');

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, Arisan.abi, signer);

  const tx = await contract.drawWinner();
  await tx.wait();

  // ambil winner
  const winnerAddress = await contract.lastWinner();
  return winnerAddress?.toLowerCase();
}



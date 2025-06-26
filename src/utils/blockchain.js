import { ethers } from 'ethers'
import Arisan from '../abis/Arisan.json'

export const joinSmartContract = async (contractAddress) => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask tidak terdeteksi!')
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' })

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, Arisan.abi, signer)

  const tx = await contract.join()
  await tx.wait()

  return tx.hash
}

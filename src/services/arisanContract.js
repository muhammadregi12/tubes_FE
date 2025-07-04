import { ethers } from 'ethers'
import Arisan from '../abis/Arisan.json'

export const deployArisanContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask tidak terdeteksi. Silakan instal MetaMask!')
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' })

  const sepoliaChainId = '0xaa36a7'
  const currentChain = await window.ethereum.request({ method: 'eth_chainId' })

  if (currentChain !== sepoliaChainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sepoliaChainId }],
      })
    } catch (switchError) {
      throw new Error('Gagal mengubah jaringan ke Sepolia.')
    }
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  const factory = new ethers.ContractFactory(Arisan.abi, Arisan.bytecode, signer)

  const feeInWei = ethers.parseEther('0.01')   // 0.01 ETH per peserta
  const intervalSeconds = 3600                 // 1 jam

  const contract = await factory.deploy(feeInWei, intervalSeconds)
  await contract.waitForDeployment()

  return contract.target
}

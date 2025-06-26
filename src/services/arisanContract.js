import { ethers } from 'ethers'
import Arisan from '../abis/Arisan.json'

export const deployArisanContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask tidak terdeteksi. Silakan instal MetaMask!')
  }

  // ✅ Paksa user connect wallet
  await window.ethereum.request({ method: 'eth_requestAccounts' })

  // ✅ Tambahkan pengecekan dan ganti jaringan ke Sepolia (chainId: 11155111 atau 0xaa36a7)
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

  // ✅ Provider & signer
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()

  // ✅ Deploy kontrak
  const factory = new ethers.ContractFactory(Arisan.abi, Arisan.bytecode, signer)
  const contract = await factory.deploy()
  await contract.waitForDeployment()

  return contract.target // atau contract.address untuk ethers v5
}

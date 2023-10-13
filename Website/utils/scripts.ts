import { ethers } from 'ethers';
import contractABI from '@/abi/Flamboyant.json';
import { Notify } from 'notiflix';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_FLAMBOYANT_ADDRESS || "";

// function to create a contract ethers.js of flamboyant
export async function createContract(walletAddress: string) {
  if (walletAddress.length < 1)
    return undefined;
  try {
    const ethereum = window.ethereum;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner(walletAddress);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
    return contract;
  } catch (e) {
    console.log(e);
    Notify.failure("An error occured");
    return undefined;
  }
}
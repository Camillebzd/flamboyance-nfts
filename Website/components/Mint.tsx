'use client'
import styles from '@/app/page.module.css';
import { createContract } from '@/utils/scripts';
import { useState } from "react";
import { Notify } from 'notiflix';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_FLAMBOYANT_ADDRESS || "";

const Mint = ({address}: {address: string}) => {
  const [userName, setUserName] = useState("");
  const [txInfo, setTxInfo] = useState({hash: "", id: -1});
  const [isLoading, setIsLoading] = useState(false);

  const mint = async () => {
    if (userName.length < 1)
      return;
    const flamboyant = await createContract(address);    
    if (flamboyant) {
      try {
        const tx = await flamboyant.safeMint(userName);
        // add a loading icon to show that minting is done and need to wait 
        setIsLoading(true);
        const rc = await tx.wait();
        const transferEvent = (rc?.logs).find((log: any) => log.fragment.name == "Transfer");
        const tokenId = Number(transferEvent?.args[2]);
        setTxInfo({hash: tx.hash, id: tokenId});
        Notify.success("NFT minted.");
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        Notify.failure("Error: failed to mint.");
      }
    }
  };

  return (
    <div className={styles.mintContainer}>
      <p>Click and create a custom NFT with your name</p>
      <div className={styles.inputBare}>
        <input placeholder="Lightning Storm" value={userName} onChange={e => setUserName(e.target.value)}/>
        <button onClick={mint}>Mint</button>
      </div>
      {isLoading && <p>Your transaction is validating, please wait...</p>}
      {txInfo.hash.length > 1 && <p>You can see your transaction <a style={{color:"blue"}} href={`https://sepolia.etherscan.io/tx/${txInfo.hash}`}>here</a> and your nft 
      <a style={{color:"blue"}} href={`https://testnets.opensea.io/fr/assets/sepolia/${CONTRACT_ADDRESS}/${txInfo.id}`}> here</a></p>}
    </div>
  );
}

export default Mint;
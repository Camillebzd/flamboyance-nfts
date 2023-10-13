'use client'
import ConnectButton from '@/components/ConnectButton'
import styles from './page.module.css'
import { useEffect, useState } from "react";
import useWindowDimensions from '@/utils/customHooks';
import Mint from '@/components/Mint';

export default function Home() {
  const [address, setAddress] = useState("");
  const [isOnGoodNetwork, setIsOnGoodNetwork] = useState(false);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const maxLightningPaths = 100;
    const maxLightningThickness = 2;
    const startingDistance = 30;
    const maxBranches = 0;
    
    function makeLightning(ctx: CanvasRenderingContext2D, startingX: number, startingY: number, branches: number) {
        ctx.beginPath();
        const amntOfPaths = getRandomInt(maxLightningPaths);
        let lightningThickness = maxLightningThickness;
        let distance = startingDistance;
        let timeout = 80;
        let speed = timeout;
        let totalTime = 0;
        for (let i = 0; i < amntOfPaths; i++) {
            ctx.strokeStyle = `rgb(255,255,255)`;
            ctx.lineWidth = getRandomInt(lightningThickness);
            lightningThickness /= 1.2;
            setTimeout(() => {
                ctx.moveTo(startingX, startingY);
                let endingX = getRandomInt(distance) * negOrPos() + startingX;
                let endingY =  startingY + getRandomInt(distance * 2);
                distance /= 1.1;
                ctx.lineTo(endingX, endingY);
                startingX = endingX;
                startingY = endingY;
                ctx.stroke();
                if (branches < maxBranches && getRandomInt(maxLightningPaths / 6) == 1) {
                    let time = makeLightning(ctx, startingX, startingY, branches + 1);
                    totalTime += time;
                }
            }, timeout);
            speed /= 1.4;
            timeout += speed;
        }
        return timeout + totalTime;
    }
    
    function negOrPos() {
        return Math.round(Math.random()) == 0 ? -1 : 1;
    }
    
    function getRandomInt(max: number) {
        return Math.ceil(Math.random() * max);
    }
    
    let timerFadeOut: NodeJS.Timeout;
    let timerLightning: NodeJS.Timeout;
    let canvas = document.getElementById("storm") as HTMLCanvasElement;
    function createCanvasAndLightning() {
        const ctx = canvas.getContext("2d");
        if (!ctx)
          return;
        const time = makeLightning(ctx, getRandomInt(canvas.width), getRandomInt(canvas.height / 3), 0);
        canvas.style.animationName = 'flash';
        canvas.style.animationDuration = time + "ms";
        timerFadeOut = setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, time * 2);
    }
    timerLightning = setInterval(createCanvasAndLightning, 2000);
    return () => {
      clearTimeout(timerFadeOut);
      clearTimeout(timerLightning);
    };
  }, []);

  const showBody = () => {
   if (address.length > 0 && isOnGoodNetwork) {
    return (
      <Mint address={address}/>
    );
   } else {
    return (
      <div>
        <p style={{fontSize: 'large'}}>Connect your metamask on sepolia network to interact.</p>
      </div>
    );
   }
  }

  return (
    <>
      <canvas className={styles.myCanvas} id='storm' width={width} height={height}>
      </canvas>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Flamboyance NFTs - SEPOLIA
          </p>
          <ConnectButton address={address} setAddress={setAddress} isOnGoodNetwork={isOnGoodNetwork} setIsOnGoodNetwork={setIsOnGoodNetwork}/>
        </div>

        {showBody()}
      </main>
    </>
  )
}

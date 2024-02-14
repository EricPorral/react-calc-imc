"use client"

import styles from "./page.module.css";
import poweredImage from '../assets/powered.png'
import leftArrowImage from '@/assets/leftarrow.png'
import { useState } from "react";
import { levels, calculateImc, Level } from "@/helpers/imc";
import { GridItem } from "@/components/GridItem";

export const Page = () => {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(height && weight) {
      setToShow(calculateImc(height, weight));
    } else {
      alert('Digite todos os campos!');
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeight(0);
    setWeight(0);
  }

  return (
    <div className={styles.main}>

      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage.src} alt='' width={150}/>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Indíce de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

          <input 
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
            value={height > 0 ? height : ''}
            onChange={e => setHeight(parseFloat(e.target.value))}
            disabled={toShow ? true : false} 
          />

          <input 
            type="number"
            placeholder="Digite o seu peso. Ex: 45.5 (em kg)"
            value={weight > 0 ? weight : ''}
            onChange={e => setWeight(parseFloat(e.target.value))}
            disabled={toShow ? true : false} 
          />

          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item}/>
              ))}
            </div>
          }
          {toShow && 
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage.src} alt="" width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>

    </div>
  );
}

export default Page;

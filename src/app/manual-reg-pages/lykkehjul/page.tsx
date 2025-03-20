"use client";
import React, { useState, useEffect } from "react";
import style from "./page.module.scss"
import is_miniadmin from "@/app/components/is-miniadmin/is-miniadmin"
import increment_manual_money_registration from "@/app/components/manual-money-registration-component/manual-money-registration-component"




async function placeLodd(setLoddSold: React.Dispatch<React.SetStateAction<number>>,amount:number) {
    const lykkeHjulName = "lykkehjulPenger"
    const moneyMadeFromSpins = 25*100 // 25 kr *100 ore
    const response = await increment_manual_money_registration(lykkeHjulName,moneyMadeFromSpins*amount,amount)
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setLoddSold(response.amountSold)
}

export default function App() {
    const [loadminiadminPage, setloadminiadminPage] = useState(false);
    const [spinsSold, setSpinsSold] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const is_admin_response = await is_miniadmin()
            setloadminiadminPage(is_admin_response)
        }
        fetchData();
    }, []);

    if (loadminiadminPage) {
        return (
            <div className={style.mainDiv}>
                <h1 className={style.title}> Dere har solgt {spinsSold} spin! Forsett sånn!</h1>
                <br></br>
                <div className={style.buttonHolder}>
                <button className={style.bongBtn} onClick={e => placeLodd(setSpinsSold,1)}>Noen har kjøpt 1 spin</button>
                </div>
                <h1><b>!MERK!</b> bare for stattestikk! Må ikke brukes for ekte pengehåndtering</h1>
            </div>
        );
    }

    return (<p>Du har ikke tilgang</p>)
}

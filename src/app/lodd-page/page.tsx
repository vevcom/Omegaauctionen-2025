"use client";
import React, { useState, useEffect } from "react";
import style from "./page.module.scss"
import is_miniadmin from "../components/is-miniadmin/is-miniadmin";
import increment_lodd_sold from "../components/incrementLoddSalg/incrementLoddSalg";




async function placeLodd(setLoddSold: React.Dispatch<React.SetStateAction<number>>,amount:number) {
    const response = await increment_lodd_sold(amount)
    if (!response){
        alert("noe gikk galt! prøv igjen")
        return;
    }
    setLoddSold(response)
}

export default function App() {
    const [loadminiadminPage, setloadminiadminPage] = useState(false);
    const [loddSold, setLoddSold] = useState(0);

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
                <h1 className={style.title}> Dere har solgt {loddSold} lodd! Forsett sånn!</h1>
                <br></br>
                <div className={style.buttonHolder}>
                <button className={style.bongBtn1} onClick={e => placeLodd(setLoddSold,1)}>Noen har kjøpt 1 lodd</button>
                <button className={style.bongBtn2} onClick={e => placeLodd(setLoddSold,3)}>Noen har kjøpt 3 lodd</button>
                <button className={style.bongBtn3} onClick={e => placeLodd(setLoddSold,5)}>Noen har kjøpt 5 lodd</button>
                <button className={style.bongBtn4} onClick={e => placeLodd(setLoddSold,10)}>Noen har kjøpt 10 lodd</button>
                </div>
                <h1><b>!MERK!</b> bare for stattestikk! Må ikke brukes for ekte pengehåndtering</h1>
            </div>
        );
    }
    return (<p>Du har ikke tilgang</p>)
}

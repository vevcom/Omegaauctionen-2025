"use server"

import getUserID from "@/app/api/auth/getUserId"
import { prisma } from "@/app/prisma"
import is_miniadmin from "../is-miniadmin/is-miniadmin"


//This function uses an unapproved item to register amounts of money made live. one stock = One øre
//it uses stock for this
export default async function increment_LiveAuctionStats(amountInOre:number) {
    // The statistics of the site would be ruined if these items are approved. Hence we have chosen to call it "DONOTAPPROVE"
    const lodd_name = "DONOTAPPORVELiveAuction"
    const moneyForLoddOre = 1

    if (amountInOre<=0){
        return false
    }

    //Checks if logged in
    const userID = await getUserID()
    if (!userID) {
        return false;
    }

    //Checks if user has mini admin accsess
    const isAdmin = await is_miniadmin()
    if (!isAdmin){
        return false
    }

    //Gets live sale object
    let liveSaleObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: lodd_name, // IF SOMEONE NAMES THERI AUCTION ITEM THIS, ill be mad
        }
    })
    //makes live sale object if there is none
    if (!liveSaleObject) {
        liveSaleObject = await prisma.auksjonsObjekt.create({
            data: {
                currentSaleTime: new Date("2022-03-25"),
                finalSaleTime: new Date("2022-03-25"),
                description: "DONOTAPPOVE",
                name: lodd_name,
                startPriceOre: moneyForLoddOre,
                currentPriceOre: moneyForLoddOre,
                approved: false,
                stock: 0
            }
        })
    }
    //uses stock to store amount of ore made
    const respone = await prisma.auksjonsObjekt.update({ where: { id: liveSaleObject.id }, data: { stock: liveSaleObject.stock + amountInOre } })
    if (!respone){
        return false;
    }
    //returns number of ore made
    return liveSaleObject.stock +amountInOre;
}   
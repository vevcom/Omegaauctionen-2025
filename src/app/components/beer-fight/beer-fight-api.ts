"use server"

import getUserID from "@/app/api/auth/getUserId";
import { prisma } from "@/app/prisma";
import { connect } from "http2";

function validObject(object:string) {
    if (object == "Hansa" || object == "IkkeHansa") {return true;}
    return false;
}

async function getPrice(object:string) {
    if (!validObject(object)) {
        console.log("error: not valid object name")
        return false;
    }
    let objectname = "DONOTAPPROVE" + object;
    let beerObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: objectname,
        }
    });
    if (!beerObject) {
        return false;
    }
    return beerObject.currentPriceOre;
}
export async function getPrices() {
    let hansa = await getPrice("Hansa");
    let ikkehansa = await getPrice("IkkeHansa");
    if (!hansa || !ikkehansa) {return [0,0];}
    return ([hansa,ikkehansa]);
}

export async function beerToServer (
    {e, object} 
    : 
    {e:FormData, object:string}
) {
    
    const now = new Date()
    const start = new Date("2025-03-20T16:00:00.000Z")
    const end = new Date("2025-03-20T22:00:00.000Z")
    if (now < start || now > end) {
        return "ikke i tidsrammen"
    }



    if (!validObject(object)) {
        console.log("error: not valid object name")
        return "error: not valid object name";
    }
    let objectname = "DONOTAPPROVE" + object;
    let pattern = /^[0-9]+$/;
    if (!pattern.test(String(e.get("number")))) {
        console.log("error: number missing")
        return "error: number missing";
    }
    let price = Number(e.get("number"))*100;
    const userID = await getUserID();
    if (!userID) {
        console.log("Not logged in")
        return "Not logged in";
    }
    // checks if a beer exists
    let beerObject = await prisma.auksjonsObjekt.findFirst({
        where: {
            name: objectname,
        }
    });
    // if this is the first time the beer object is being created, run this
    if (!beerObject) {
        beerObject = await prisma.auksjonsObjekt.create({
            data: {
                description: "DONOTAPPROVE",
                name: objectname,
                startPriceOre: price,
                currentPriceOre: price,
                approved: false,
                stock: 0,
                
            }
        })
        if (!beerObject) {
            console.log("unable to create beerObject");
            return "unable to create beerObject";
        }
    }
    else {
        let newprice = price + beerObject.currentPriceOre;
        await prisma.auksjonsObjekt.update({
            where: {id:beerObject.id},
            data: {
                currentPriceOre:{increment:price},
                startPriceOre:{increment:price},
            }
        })
    }
    const bud = await prisma.bid.create({
        data: {
            priceOre:price,
            auctionObject:{
                connect:{
                    id:beerObject.id,
                }
            },
            bidder:{
                connect:{
                    id:userID,
                }
            },
        }
    });
    if (!bud) {
        console.log("Could not create bid")
        return "Could not create bid";
    }
    return null;
}
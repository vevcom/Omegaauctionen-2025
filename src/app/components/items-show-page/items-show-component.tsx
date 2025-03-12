
import Link from "next/link";
import styles from "./component.module.scss";
import ImageComponent from "@/app/components/pictureServerComponents/getImgFromNameComponent"
import { AuksjonsObjekt} from "@prisma/client";


export default function ItemsPageComponent({ allPages, currentPageNumber,pageTitle="Auksjonsobjekter" }:{allPages:Array<Array<AuksjonsObjekt>>,currentPageNumber:number,pageTitle?:string}) {
    if (!allPages[currentPageNumber]){
        return <p className={styles.tekst}>Laster inn... Ingen ting å se her 🙈</p>;
    }

    //cuts of name before it overflows
    function cutOffName(name:string){
        const maxLengthCharacters = 20;
        if (name.length> maxLengthCharacters) {
            return name.substring(0,maxLengthCharacters) +"..."
        }
        return name
    }

    return (<div className={styles.side}>
        
        <div>
            <h1 className={styles.title}>{pageTitle}</h1>
        </div>
        
        <div className={styles.objekter}>
            {allPages[currentPageNumber].map(object => (
                
                <Link key={object.id} className={styles.objekt} href={`/auction/${object.id}`}>
                    
                        <div className={styles.objectContainer}>
                            
                                <ImageComponent style={styles.auctionImage} filename={object.imageName}/>
                            <div className={styles.textContainer}>
                                <h3 className={styles.navn}>{cutOffName(object.name)}</h3>
                                <br/>
                                <p className={styles.pris}>{object.currentPriceOre/100} kr</p>
                            </div>
                        </div>
                    
                </Link>
                ))}                
        </div>
        

        
        
       </div> 
    )
}






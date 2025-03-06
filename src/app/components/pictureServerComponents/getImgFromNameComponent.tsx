"use client";

export default function ImageFromFileName({ filename,style }: { filename: string,style:any }) {
    const serverIP =  process.env.NEXT_PUBLIC_PICTURE_SERVER_URL
    const imagePath = serverIP + '/image/'+filename


    return (
        <img className={style} src={imagePath}></img>
    );
}

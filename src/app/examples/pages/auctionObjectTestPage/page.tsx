//kokte dette fra en nettside jeg lagde fra ungdomskolen. Ja det er litt stygt men det har veldig fet conditonal rendering
"use server"
import React from 'react';
import { prisma } from '../../../prisma';
import "./styles.scss"
import sampleImg from "./walter.jpg"
import { stringify } from 'querystring';

async function App() {
  const auctionItems = await prisma.auksjonsObjekt.findMany()

  return (
    <div id="mainDiv">

      <div id="artikkler">
        {auctionItems.map((item, index) =>
          <a href="." className="artikkel">
            <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsimplisafe.com%2Ffiles%2Fimages%2Fblog%2Fwalter_white_shocked.png&f=1&nofb=1&ipt=1330d4439807d1599a56c0f747ff72808e30b7266245e1e0dbfacf252b4e81e0&ipo=images"></img>
            <h2>{item.name}</h2>
            <hr></hr>
            <p>{item.description}</p>
            <hr></hr>
            <p>Pris: {item.startPrice / 100}kr</p>
            <hr></hr>
            {item.approved ? <p className='ja'>Gokjent</p> : <p className='nei'>Ikke gokjent</p>}
            <hr></hr>
            <p>ObjektId {item.id}</p>
            <hr></hr>
            <p>Siste salgs tid(burde være skult): {item.finalSaleTime.toString()},Salg tid: {item.finalSaleTime.toString()}</p>
          </a>

        )}
      </div>
    </div>
  );
}

export default App;

import { API_URL, INVALIDATE_SECS } from '../utils/constants';
import { Coin, Currency, CustomRecord } from '../models/Coin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatDate, fromHtmlEntities } from '../utils/helpers';
import { useAction, useAppSelector } from '../store/store';
import MetaTags from '../components/MetaTags';
import Link from 'next/link';

const CoinPage = ({coinData}: { coinData: Coin }) => {
   const [ currentDate, setCurrentDate ] = useState(new Date());
   const {coin} = useAppSelector(state => state);
   const {bpi} = coin;
   const {setCoin} = useAction();
   const [ refetchCounter, setRefetchCounter ] = useState(0);

   useEffect(() => {
      setCoin(coinData);
      const idRefetchInterval = setInterval(async () => {
         console.warn('refetch')
         setCoin((await axios.get(API_URL)).data);
         setRefetchCounter(prevState => ++prevState)
      }, INVALIDATE_SECS * 1000);
      const idInterval = setInterval(() => {
         setCurrentDate(new Date());
      }, 1000);
      return () => {
         clearInterval(idInterval);
         clearInterval(idRefetchInterval);
      }
   }, [ coinData ]);

   if (!coin.bpi) return <h1 style = {{textAlign: 'center'}}>Loading...</h1>

   return (
       <main className = 'main'>
          <MetaTags desc = 'Сoin page' imagePath = '/vercel.svg' title = 'Coin stats'/>
          <Link href = '/'>
             <button>
                Home
             </button>
          </Link>
          <h2>ReFetch counter: {refetchCounter}</h2>
          <figure>
             <h2>1 {coin.chartName} equals as for {formatDate(currentDate)}</h2>
             <ul>
                {Object.keys(bpi).map(currency => {
                   const curr = (bpi as unknown as CustomRecord<Currency>)[currency];
                   return <li key = {currency}>
                      {fromHtmlEntities(curr.symbol)} {curr.rate} - {curr.description}
                   </li>
                })}
             </ul>
          </figure>
       </main>
   );
};

export default CoinPage;

export async function getStaticProps() {
   const coinData = await axios.get(API_URL);
   return {
      props: {
         coinData: coinData.data,
         revalidate: INVALIDATE_SECS,
      }
   }
}

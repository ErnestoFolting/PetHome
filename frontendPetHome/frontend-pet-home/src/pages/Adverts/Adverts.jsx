import { useEffect, useState } from 'react';
import './Adverts.css'
import { AdvertList } from '../../Components/AdvertList'
import AdvertService from '../../API/AdvertService';
import { MyLoader } from '../../UI/Loader/MyLoader';
import { useFetching } from '../../Hooks/useFetching';

export default function Adverts() {
  const [adverts, setAdverts] = useState([]);
  const [fetchAdverts, loader, error] = useFetching(async () => {
    const adverts = await AdvertService.getAllAdverts()
    setAdverts(adverts)
  })
  useEffect(() => {
    console.log("check")
    fetchAdverts()
  }, [])

  return (
    <div className="App">
      {error &&
        <h1>Error ${error}</h1>
      }
      {loader
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
        : <AdvertList adverts={adverts} />
      }
    </div>
  );
}

import { useEffect, useState } from 'react';
import './Adverts.css'
import { AdvertList } from '../../Components/AdvertList/AdvertList'
import AdvertService from '../../API/AdvertService';
import { MyLoader } from '../../UI/Loader/MyLoader';
import { useFetching } from '../../Hooks/useFetching';
import { MyModal } from '../../UI/MyModal/MyModal';
import { MyButton } from '../../UI/buttons/MyButton';
import { InputWithLabel} from '../../UI/inputs/InputWithLabel'


export default function Adverts() {
  const [adverts, setAdverts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchAdverts, loader, error] = useFetching(async () => {
    const adverts = await AdvertService.getAllAdverts()
    setAdverts(adverts)
  })
  useEffect(() => {
    async function fetchData() {
      try {
        await fetchAdverts()
      } catch (e) {
        setModalVisible(true)
      }
    }
    fetchData();
  }, [])

  return (
    <div className="advertsPage">
    <h1 style={{ textAlign: 'center', marginTop: '30px' }}> Усі оголошення</h1>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
      {loader
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
        :
        <div className='advertsAndFilters'>
          <div className='filters'>
            <h1>Фільтри</h1>
            <MyButton>Filter1</MyButton>
            <MyButton>Filter2</MyButton>
            <MyButton>Filter3</MyButton>
            <InputWithLabel
              label='Input 1'
            />
            <InputWithLabel
              label='Input 1'
            />
            <InputWithLabel
              label='Input 1'
            />
          </div>
          <div className='advertsGrid'>
            <AdvertList adverts={adverts} />
          </div>
        </div>
      }
    </div>
  );
}

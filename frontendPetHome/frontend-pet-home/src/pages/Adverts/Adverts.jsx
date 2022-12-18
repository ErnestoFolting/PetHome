import { useEffect, useState } from 'react';
import './Adverts.css'
import { AdvertList } from '../../Components/AdvertList/AdvertList'
import AdvertService from '../../API/AdvertService';
import { MyLoader } from '../../UI/Loader/MyLoader';
import { useFetching } from '../../Hooks/useFetching';
import { MyModal } from '../../UI/MyModal/MyModal';
import { getPagesCount } from '../../Common/pagesCount';
import { usePagination } from '../../Hooks/usePagination';
import { AdvertsFilter } from '../../Components/Filters/AdvertsFilter/AdvertsFilter';

export default function Adverts() {
  const [adverts, setAdverts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [queryParams, setQueryParams] = useState({ advertsLimit: 6, currentPage: 1, isDatesFit: false, costFrom: 1, costTo: 100000 });
  const [pagesArray] = usePagination(totalPages);

  const [fetchAdverts, loader, error] = useFetching(async () => {
    const response = await AdvertService.getAllAdverts(queryParams)
    const totalAdverts = response.headers['x-pagination-total-count']
    setTotalPages(getPagesCount(totalAdverts, queryParams?.advertsLimit))
    setAdverts(response.data)
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

  }, [queryParams])

  return (
    <div className="advertsPage">
      <h1 style={{ textAlign: 'center', marginTop: '30px' }}> Усі оголошення</h1>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
      {loader
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
        :
        <div className='advertsAndFilters'>
          <AdvertsFilter
            queryParams={queryParams}
            setQueryParams={setQueryParams}
          />
          <div className='advertsGrid'>
            <AdvertList
              adverts={adverts}
              pagesArray={pagesArray}
              params={queryParams}
              setParams={setQueryParams}
            />
          </div>
        </div>
      }
    </div>
  );
}

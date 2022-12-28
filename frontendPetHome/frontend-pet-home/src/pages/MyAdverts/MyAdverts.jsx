import { React, useState, useEffect, useContext } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import './MyAdverts.css'
import AdvertService from '../../API/AdvertService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { AdvertList } from '../../Components/AdvertList/AdvertList'
import { AdvertsFilter } from '../../Components/Filters/AdvertsFilter/AdvertsFilter'
import { usePagination } from '../../Hooks/usePagination';
import { getPagesCount } from '../../Common/pagesCount'
import { Context } from '../../index.js'

export const MyAdverts = () => {

    const [myAdverts, setMyAdverts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [update, setUpdate] = useState(0);

    const [totalPages, setTotalPages] = useState(0);
    const [pagesArray] = usePagination(totalPages);
    const [queryParams, setQueryParams] = useState({ advertsLimit: 6, currentPage: 1, advertsStatus: 'search', costFrom: 1, costTo: 100000 });

    const [fetchUserAdverts, loading, error] = useFetching(async () => {
        const response = await AdvertService.getUserAdverts(queryParams)
        const totalAdverts = response.headers['x-pagination-total-count']
        setTotalPages(getPagesCount(totalAdverts, queryParams?.advertsLimit))
        setMyAdverts(response.data)
    });

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUserAdverts()
            } catch (e) {
                setModalVisible(true)
            }
        }
        fetchData();
    }, [queryParams, update]);

    const { store } = useContext(Context);

    useEffect(() => {
        if (store?.myHubConnection) {
            store?.myHubConnection?.on("Apply", (postedAdvert) => {
                setUpdate(postedAdvert.id)
            })
        }
    }, [store?.myHubConnection]);

    return (
        <div className='userAdvertsPage'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            {loading
                ? <MyLoader />
                : <div className='userAdvertsContent'>
                    <h1 style={{ textAlign: 'center', marginTop: '30px' }}> Ваші оголошення</h1>
                    <div className='advertsAndFilters'>
                        <AdvertsFilter
                            queryParams={queryParams}
                            setQueryParams={setQueryParams}
                            isUserAdverts
                        />
                        <div className='advertsGrid'>
                            <AdvertList
                                userAdverts={true}
                                adverts={myAdverts}
                                pagesArray={pagesArray}
                                params={queryParams}
                                setParams={setQueryParams}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


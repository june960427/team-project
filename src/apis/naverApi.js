import { useReducer, useEffect } from 'react';
import axios from 'axios';

const NAVER_ID = import.meta.env.VITE_NAVER_ID;
const NAVER_SECRET = import.meta.env.VITE_NAVER_SECRET;

//reducer 함수로 action 타입에 따라 상태 업데이트
const reducer = (state, action) => {
    switch(action.type) {
        case 'LOADING':
            return { loading: true, data: null, error: null };
        case 'SUCCESS':
            return { loading: false, data: action.data, error: null };
        case 'ERROR':
            return { loading: false, data: null, error: action.error };
        default:
            return state;
    }
}

//검색 결과 가져오기
const searchFood = (search) => {
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });

    const fetchData = async () => {
        try {
            dispatch({ type: 'LOADING' });
            const { data: { items } } = await axios.get(
                'api/v1/search/local.json', {
                params: { query: search + '맛집', display: 5 },
                headers: {
                    'X-Naver-Client-Id': NAVER_ID,
                    'X-Naver-Client-Secret': NAVER_SECRET
                },
            });
            dispatch({ type: 'SUCCESS', data: items });
        } catch (err) {
            console.error('API Error:', err);
            dispatch({ type: 'ERROR', error: err });
        }
    };

    useEffect(() => {
        fetchData();
    }, [search]);

    return state;
}

export default searchFood;

import React, {useRef} from 'react'

const useCommon = () => {
    const page = useRef(1);
    const setPage = currentPage => {
        page.current = currentPage;
        return page; // 保证setPage有返回值
    }
    return [page, setPage];
}

export default useCommon
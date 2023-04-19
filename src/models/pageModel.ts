import { request } from "@umijs/max";
import { useEffect, useState } from "react";

const usePage = () => {
    console.log('pageModel')
    const [schema, setSchema] = useState({})
    const [pageId, setPageId] = useState()
    useEffect(() => {
        if (pageId)
            request(`/config/pages/${pageId}.json`).then(res => setSchema(res));
    }, [pageId])
    return { pageId, schema, setSchema, setPageId };
}
export default usePage;
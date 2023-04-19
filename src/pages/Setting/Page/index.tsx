import { request, useMatch, useModel } from '@umijs/max';
import styles from './index.less';
import PageDesinger from '@/components/PageDesigner';
import { Button, Divider, Layout, Space } from 'antd';
import { useMemo, useState } from 'react';
import copy from 'copy-to-clipboard';

const HomePage: React.FC = (props) => {
    const match = useMatch('/setting/page/:id');
    const pageId = match?.params.id;
    const [jsonSchema, setJsonSchema] = useState({})
    useMemo(() => request(`/config/pages/${pageId}.json`).then(res => setJsonSchema(res)), [pageId]);
    const [preview, setPreview] = useState(false);
    return (
        <div className={styles.container}>
            <Space style={{ margin: '5px', float: 'right' }}>
                <Button key={1} onClick={() => setPreview(!preview)}>{preview ? '编辑' : '预览'}</Button>
                <Button key={2} type='primary' onClick={e => { copy(JSON.stringify(jsonSchema)) }}>复制配置</Button>
            </Space>
            <Divider style={{ margin: '0px' }} />
            <PageDesinger pageSchmea={jsonSchema} preview={preview} onChange={v => setJsonSchema(v)} style={{ height: '100vh' }} />
        </div>
    );
};

export default HomePage;

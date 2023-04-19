import { PageContainer } from '@ant-design/pro-components';
import { useMatch, useModel } from '@umijs/max';
import styles from './index.less';
import PageRender from '@/components/PageRender';
import { Button } from 'antd';
import { Icon } from 'umi';

const HomePage: React.FC = (props) => {
    const match = useMatch('/page/:id')
    const routePageId = match?.params.id;
    const { pageId, schema, setPageId } = useModel('pageModel');
    if (routePageId != pageId)
        setPageId(routePageId);
    return (
        <PageContainer ghost extra={
            [
                <Button href={`/setting/page/${routePageId}`} target='_blank' key={1} ><Icon icon='ic:baseline-border-color' /></Button >
            ]
        }>
            <div className={styles.container}>
                <PageRender config={schema} />
            </div>
        </PageContainer>
    );
};

export default HomePage;

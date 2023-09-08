import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { useState } from 'react';

const SettingLayout: React.FC = (props) => {
    const { name } = useModel('global');
    console.log('setting layout')
    return (
        <div>{props.children}</div>
    );
};

export default SettingLayout;

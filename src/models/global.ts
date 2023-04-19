// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import { request } from '@umijs/max';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  return {
    name,
    setName,
  };
};

export default useUser;

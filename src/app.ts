// 运行时配置
import { request } from '@umijs/max';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
interface ILinkAppProps {
  id: string,
  title: string,
}
interface IInitialState {
  userName: string,
  title: string,
  menus: [any],
  linkApps: ILinkAppProps[]
  appJson: any,
}
export async function getInitialState(): Promise<IInitialState> {
  const appJson = await request('/config/app.json');
  return { userName: 'admin', title: appJson.title, menus: appJson.menus, linkApps: appJson.linkApps, appJson };
}

export const layout = ({ initialState }) => {
  console.log('layout app.ts')
  const initState: IInitialState = initialState;
  const fixMenus = (menus: [any]) => {
    return menus.map(v => {
      if (v.children) {
        v.children = fixMenus(v.children);
      }
      else {
        if (!v.path) { v.path = `/page/${v.key}` }
      }
      return v;
    })
  }
  return {
    logo: '/config/logo.png',
    title: initState.title,
    appList: initState.linkApps,
    menu: {
      locale: false,
      params: {
        userId: initialState?.currentUser?.userid,
      },
      request: async (params, defaultMenuData) => {
        console.log(initialState)
        // initialState.currentUser 中包含了所有用户信息
        if (initState.menus) {
          return fixMenus(initState.menus)
        }
        // const menuData = await request('/api/v1/menus/getAppMenus');
        // console.log(menuData.data)
        // return menuData.data;
      },
    },
  };
};

const users = [
    { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
    { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
  ];
  
  export default {
    'GET /dsl/v1/page': (req: any, res: any) => {
      res.json({
        success: true,
        data: { list: users },
        errorCode: 0,
      });
    },
  };
  
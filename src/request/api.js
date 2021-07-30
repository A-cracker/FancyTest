import Network from './network';
//获取个人信息
export const getInfo = () => Network.get('/test',{});
//保存个人信息
export const saveInfo = data => Network.put('/test2',data);
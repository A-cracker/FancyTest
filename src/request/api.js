import Network from './network';
//获取个人信息
export const getInfo = () => Network.get('/test', {});
//保存个人信息
export const saveInfo = data => Network.put('/test2', data);
//初始化细节页面
export const initDetail = (id, type) => Network.get('/test3', { id, type })

export const getToken = (mail, password) => Network.post('/auth/login', {
     mail,
     password
})
//添加邀请成员
export const inviteMem =  data => Network.post('/api/edit/inviteMembers',data)
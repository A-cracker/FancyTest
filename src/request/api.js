import Network from './network';
//获取个人信息
export const getInfo = () => Network.get('/test', {});
//保存个人信息
export const saveInfo = data => Network.put('/test2', data);
//初始化细节页面
export const initDetail = (id, type) => Network.get('/test3', { id, type })

export const getToken = (studentNumber,password) => Network.postLogin('/auth/login', 
     studentNumber,
     password
)

//注册提交信息
export const registerInfo = (userName,studentNumber,password) => Network.post('/edit/registerUser',{userName,studentNumber,password})


//添加邀请成员
export const inviteMem =  (projectId,memberArray) => Network.post('/edit/inviteMembers',{projectId,memberArray})

//初始化邀请成员
export const initMem = () => Network.get('/edit/initMemebers',{});

//删除邀请成员
export const deleteMem = (projectId,studentNumber) => Network.delete('/edit/deleteMembers',{projectId,studentNumber})
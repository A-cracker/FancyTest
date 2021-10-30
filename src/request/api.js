import Network from './network';
//获取个人信息
export const getInfo = () => Network.post('/initcontent/initStudent',{});
//保存个人信息
export const saveInfo = (info) => Network.put('/edit/editStudent', {info});
//avatar,role,sexuality,phoneNumber,school,mail,grade,university,location,_class,studentNumber
//初始化细节页面
export const initDetail = (id, type) => Network.get('/test3', { id, type })

export const getToken = (studentNumber,password) => Network.post('/auth/login', 
     {studentNumber,
     password}
)

//注册提交信息
export const registerInfo = (userName,studentNumber,password) => Network.post('/edit/registerUser',{userName,studentNumber,password})


//添加邀请成员
export const inviteMem =  (projectId,memberArray) => Network.post('/edit/inviteMembers',{projectId,memberArray})

//初始化邀请成员
export const initMem = () => Network.get('/edit/initMemebers',{});

//删除邀请成员
export const deleteMem = (projectId,studentNumber) => Network.delete('/edit/deleteMembers',{projectId,studentNumber})

//初始化项目列表
export const initMyProj =  () => Network.post('/project/initMyProj',{})

//删除项目列表中项目
export const deleteProject = (projectId) => Network.delete('/project/deleteProject',{data:{projectId}})

//增加项目列表中项目
export const addProject = (project) => Network.post('/project/addProject',project)

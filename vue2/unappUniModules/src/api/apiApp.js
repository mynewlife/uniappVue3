/*
 * @Author: your name
 * @Date: 2021-12-06 15:28:42
 * @LastEditTime: 2022-05-26 14:28:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \phone-chengdu\api\apiApp.js
 */
import { appRequest } from '@/utils/request.js';

// 获取当前登陆用户信息
const userUserMe = info => {
  return appRequest('/system-user/system/user/user-me', info, 'GET');
};
// 部门表- 根据deptIds查询详细信息
const apiInfoId = info => {
  return appRequest('/system-user/system/dept/api-info/ids', info, 'POST');
};
// 下葬任务
const taskTaskList = info => {
  return appRequest(
    `/project/operation/task/taskListTable?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};

//  详情/operation/task/task/{id}
const taskTask = info => {
  return appRequest(`/project/operation/task/task/${info.id}`, null, 'GET');
};

//服务确认
const operationTask = info => {
  return appRequest('/project/operation/task', info, 'PUT');
};
// 相关项目
const findByCode = info => {
  return appRequest('/project/cemeteryOrder/findByCode', info, 'GET');
};
// busMourn(礼厅业务表)- 根据服务项目ID确认服务
const busMournCheckGoodsById = info => {
  return appRequest('/project/bus/busMourn/CheckGoodsById', info, 'POST');
};
// (checkReport)公墓巡查上报- 查询列表
const listAll = info => {
  return appRequest(
    `/project/bury/checkReport/list?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};

const listAlls = info => {
  return appRequest(`/project/bury/checkReport/${info.id}`, {}, 'GET');
};
const checkReportImage = info => {
  return appRequest(`/project/bury/checkReport/image/${info.id}`, {}, 'GET');
};
// cemetery(公墓)- 树形结构查询
const cemeteryList = info => {
  return appRequest('/project/bury/cemetery/list', info, 'POST');
};
// (checkReport)公墓巡查上报- 新增
const checkReport = info => {
  return appRequest('/project/bury/checkReport', info, 'POST');
};
// attachment(附件)- 通过url删除
const attachmentUrl = info => {
  // if (info.url) info.url = encodeURIComponent(info.url);
  return appRequest('/project/file/attachment/url', info, 'POST', true);
};

//TODO 3-(台账)- 下葬台账
const cemBury = info => {
  return appRequest(
    `/project/cem/bury?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};
// 下葬任务- 下葬(已准备)
const burialReady = info => {
  return appRequest('/project/app/cem/burial/ready', info, 'POST');
};
// 下葬任务- 下葬(已确定)
const burialConfirmed = info => {
  return appRequest('/project/app/cem/burial/confirmed', info, 'POST');
};

// 下葬任务- 下葬(已完成)
const burialComplete = info => {
  return appRequest('/project/app/cem/burial/complete', info, 'POST');
};

//TODO 3-(台账)- 迁走台账
const cemMoveList = info => {
  return appRequest(
    `/project/cem/moveList?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};
//moveConfirmed 迁走任务- 迁走(已确定)
const moveConfirmed = info => {
  return appRequest('/project/app/cem/move/confirmed', info, 'POST');
};
//moveReady 迁走任务- 迁走(已准备)
const moveReady = info => {
  return appRequest('/project/app/cem/move/ready', info, 'POST');
};
// 迁走任务- 迁走(已完成)
const moveComplete = info => {
  return appRequest('/project/app/cem/move/complete', info, 'POST');
};

//TODO 3-(台账)- 墓碑台账
const tombStoneList = info => {
  return appRequest(
    `/project/cem/tombStone/list?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};
// 墓碑任务- 已完成
const tombStoneAffirm = info => {
  return appRequest('/project/app/cem/tombStone/affirm', info, 'POST');
};

//TODO 3-(台账/任务)- 维护任务

const cemStruckList = info => {
  return appRequest(
    `/project/cem/struck/list?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};
// 维护任务- 已完成
const struckAffirm = info => {
  return appRequest('/project/app/cem/struck/affirm', info, 'POST');
};
const handlersList = info => {
  return appRequest('/project/cem/handlersList', info, 'POST');
};

// 通过逝者ids查询 收费项目
const listByDeadIds = info => {
  return appRequest(`/project/cemeteryOrderItem/listByDeadIds/${info.number}`, info, 'POST');
};
// (checkReport)公墓巡查上报- 查询列表
const checkReportList = info => {
  return appRequest(
    `/project/bury/checkReport/list?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};
//! (checkReport)公墓巡查上报- 修改
const checkReportPut = info => {
  return appRequest('/project/bury/checkReport', info, 'PUT');
};
//预警提醒- 下葬到期提醒
const listExpire = info => {
  return appRequest(
    `/project/cem/bury/list/expire?pageNum=${info.pageNum}&pageSize=10&orderByColumn=createTime&isAsc=desc`,
    info,
    'POST'
  );
};

module.exports = {
  listExpire,
  handlersList,
  checkReportPut, //! (checkReport)公墓巡查上报- 修改
  checkReportList, // (checkReport)公墓巡查上报- 查询列表
  cemBury, // 3-(台账)- 下葬台账
  burialReady, // 下葬任务- 下葬(已准备)
  burialConfirmed, // 下葬任务- 下葬(已确定)
  burialComplete, // 下葬任务- 下葬(已完成)
  tombStoneList, //3-(台账)- 墓碑台账
  cemMoveList, //3-(台账)- 迁走台账
  moveReady, // 迁走任务- 迁走(已准备)
  moveConfirmed, //迁走任务- 迁走(已确定)
  moveComplete, //迁走任务- 迁走(已完成)
  cemStruckList, //3-(台账/任务)- 维护任务
  struckAffirm, //维护任务- 已完成
  tombStoneAffirm, // 墓碑任务- 已完成
  listByDeadIds, // 通过逝者ids查询 收费项目
  attachmentUrl,
  userUserMe,
  apiInfoId,
  taskTaskList,
  taskTask,
  operationTask,
  findByCode,
  busMournCheckGoodsById,
  listAll,
  listAlls,
  cemeteryList,
  checkReport,
  checkReportImage,
};

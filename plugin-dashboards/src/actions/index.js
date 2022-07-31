import {  Actions } from '@twilio/flex-ui';
import { updateWorkerAttributesForCapacity } from '../utils/workerUtil';

const PLUGIN_NAME = 'DashboardsPlugin';

export default (manager)=> {

  const workerSid = manager.workerClient.sid;
    
    Actions.addListener('afterAcceptTask', async (payload) => {
      if (['chat', 'sms'].includes(payload.task.taskChannelUniqueName)) {
        console.log(PLUGIN_NAME, 'Task Accepted, Update Capacity');
        updateWorkerAttributesForCapacity(workerSid);
      }
    });

    Actions.addListener('afterCompleteTask', async (payload) => {
      if (['chat', 'sms'].includes(payload.task.taskChannelUniqueName)) {
        console.log(PLUGIN_NAME, 'Task Completed, Update Capacity');
        updateWorkerAttributesForCapacity(workerSid);
      }
    });
  }
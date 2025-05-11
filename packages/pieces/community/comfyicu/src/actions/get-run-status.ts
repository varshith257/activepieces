import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const getRunStatus = createAction({
  name: 'get_run_status',
  auth: comfyIcuAuth,
  displayName: 'Get Run Status',
  description: 'Check the status of a submitted workflow run.',
  props: {
    workflow_id: Property.ShortText({
      displayName: 'Workflow ID',
      description: 'The ID of the workflow.',
      required: true,
    }),
    run_id: Property.ShortText({
      displayName: 'Run ID',
      description: 'The ID of the run to check the status for.',
      required: true,
    }),
  },
  async run(context) {
    const { workflow_id, run_id } = context.propsValue;

    const response = await httpClient.sendRequest({
      method: HttpMethod.GET,
      url: `https://comfy.icu/api/v1/workflows/${workflow_id}/runs/${run_id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${context.auth}`,
      },
    });

    return response.body;
  },
});

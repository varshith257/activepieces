import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const getRunOutputs = createAction({
    name: 'get_run_outputs',
    auth: comfyIcuAuth,
    displayName: 'Get Run Outputs',
    description: 'Fetch generated images or videos from a completed run.',
    props: {
        workflow_id: Property.ShortText({
            displayName: 'Workflow ID',
            required: true,
        }),
        run_id: Property.ShortText({
            displayName: 'Run ID',
            required: true,
        }),
    },
    async run(context) {
        const { workflow_id, run_id } = context.propsValue;

        const response = await httpClient.sendRequest({
            method: HttpMethod.GET,
            url: `https://comfy.icu/api/v1/workflows/${workflow_id}/runs/${run_id}/outputs`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.auth}`,
            },
        });

        return response.body;
    },
});

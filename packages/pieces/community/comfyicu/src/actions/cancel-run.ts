import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const cancelRun = createAction({
    name: 'cancel_run',
    auth: comfyIcuAuth,
    displayName: 'Cancel Run',
    description: 'Interrupt an ongoing workflow execution.',
    props: {
        runId: Property.ShortText({
            displayName: 'Run ID',
            required: true,
            description: 'The ID of the workflow run to cancel.',
        }),
    },
    async run(context) {
        const { runId } = context.propsValue;

        const response = await httpClient.sendRequest({
            method: HttpMethod.POST,
            url: `https://comfy.icu/api/v1/runs/${runId}/cancel`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.auth}`,
            },
        });

        return response.body;
    },
});
import { createAction } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const listWorkflows = createAction({
    name: 'list_workflows',
    auth: comfyIcuAuth,
    displayName: 'List Workflows',
    description: 'Retrieve available workflows for execution.',
    props: {},
    async run(context) {
        const response = await httpClient.sendRequest({
            method: HttpMethod.GET,
            url: 'https://api.comfy.icu/v1/workflows',
            headers: {
                Authorization: `Bearer ${context.auth}`,
            },
        });

        return response.body;
    },
});

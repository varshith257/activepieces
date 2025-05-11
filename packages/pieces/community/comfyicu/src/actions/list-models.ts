import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const listModels = createAction({
    name: 'list_models',
    auth: comfyIcuAuth,
    displayName: 'List Models',
    description: 'Retrieve available models for workflow execution.',
    props: {},
    async run(context) {
        const response = await httpClient.sendRequest({
            method: HttpMethod.GET,
            url: 'https://comfy.icu/api/v1/models',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.auth}`,
            },
        });

        return response.body;
    },
});

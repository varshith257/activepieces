import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const createWorkflow = createAction({
    name: 'create_workflow',
    auth: comfyIcuAuth,
    displayName: 'Create Workflow',
    description: 'Upload a new workflow JSON to the ComfyICU platform.',
    props: {
        workflowJson: Property.LongText({
            displayName: 'Workflow JSON',
            description: 'The JSON representation of your workflow.',
            required: true,
        }),
    },
    async run(context) {
        const { workflowJson } = context.propsValue;

        try {
            const response = await httpClient.sendRequest({
                method: HttpMethod.POST,
                url: 'https://comfy.icu/api/v1/workflows',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${context.auth}`,
                },
                body: JSON.parse(workflowJson),
            });

            return response.body;
        } catch (error) {
            return {
                error: 'Failed to create workflow.',
                details: error instanceof Error ? error.message : String(error),
            };
        }
    },
});

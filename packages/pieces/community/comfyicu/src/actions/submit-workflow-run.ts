import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const submitWorkflowRun = createAction({
    name: 'submit_workflow_run',
    auth: comfyIcuAuth,
    displayName: 'Submit Workflow Run',
    description: 'Execute a workflow with specified parameters and inputs.',
    props: {
        workflowId: Property.ShortText({
            displayName: 'Workflow ID',
            required: true,
            description: 'The ID of the workflow to execute.',
        }),
        prompt: Property.Json({
            displayName: 'Prompt',
            required: true,
            description: 'JSON object containing the workflow prompt.',
        }),
        files: Property.Json({
            displayName: 'Files',
            required: false,
            description: 'Optional files to include in the workflow run.',
        }),
        webhook: Property.ShortText({
            displayName: 'Webhook URL',
            required: false,
            description: 'URL to receive run status updates.',
        }),
    },
    async run(context) {
        const { workflowId, prompt, files, webhook } = context.propsValue;

        const body: Record<string, any> = {
            prompt,
        };

        if (files) {
            body['files'] = files;
        }

        if (webhook) {
            body['webhook'] = webhook;
        }

        const response = await httpClient.sendRequest({
            method: HttpMethod.POST,
            url: `https://comfy.icu/api/v1/workflows/${workflowId}/runs`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.auth}`,
            },
            body,
        });

        return response.body;
    },
});

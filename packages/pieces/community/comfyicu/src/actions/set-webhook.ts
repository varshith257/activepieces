import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { comfyIcuAuth } from '../';

export const setWebhook = createAction({
    name: 'set_webhook',
    auth: comfyIcuAuth,
    displayName: 'Set Webhook',
    description: 'Define a webhook URL to receive run status updates.',
    props: {
        url: Property.ShortText({
            displayName: 'Webhook URL',
            required: true,
        }),
        event: Property.StaticDropdown({
            displayName: 'Event Type',
            required: true,
            defaultValue: 'run.completed',
            options: {
                options: [
                    { label: 'Run Completed', value: 'run.completed' },
                    { label: 'Run Failed', value: 'run.failed' },
                    { label: 'New Workflow Created', value: 'workflow.created' },
                    { label: 'Model Updated', value: 'model.updated' },
                ],
            },
        }),
    },
    async run(context) {
        const { url, event } = context.propsValue;

        const response = await httpClient.sendRequest({
            method: HttpMethod.POST,
            url: `https://comfy.icu/api/v1/webhooks`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.auth}`,
            },
            body: {
                url,
                event,
            },
        });

        return response.body;
    },
});

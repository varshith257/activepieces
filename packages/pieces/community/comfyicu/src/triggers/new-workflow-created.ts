import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';

export const newWorkflowCreatedTrigger = createTrigger({
    name: 'new_workflow_created',
    displayName: 'New Workflow Created',
    description: 'Triggers when a new workflow is created in ComfyICU.',
    type: TriggerStrategy.WEBHOOK,
    props: {},

    sampleData: {
        workflow_id: "WFLOW-abc123xyz789",
        name: "Anime Style Diffusion",
        created_at: "2025-05-11T12:34:56Z",
        creator: {
            id: "user-456789",
            name: "Vamshi Dev",
            email: "vamshi@example.com"
        },
        metadata: {
            node_count: 42,
            model: "realisticVisionV5",
            resolution: "1024x1024"
        }
    },

    async onEnable() {
        // Assumes webhook URL is configured manually in ComfyICU platform
    },

    async onDisable() {
        // No need to remove webhook (not programmatically registered)
    },

    async run(context) {
        const body = context.payload.body as {
            workflow_id?: string;
            [key: string]: unknown;
        };

        if (body?.workflow_id) {
            return [body];
        }

        return [];
    },
});

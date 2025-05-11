import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';

export const modelUpdatedTrigger = createTrigger({
    name: 'model_updated',
    displayName: 'Model Updated',
    description: 'Triggers when a model is updated or added in ComfyICU.',
    type: TriggerStrategy.WEBHOOK,
    props: {},

    sampleData: {
        model_id: "model-realvision-v5",
        name: "Realistic Vision v5",
        updated_at: "2025-05-11T15:22:33Z",
        version: "v5",
        changelog: "Improved lighting, realism, and lower memory footprint.",
        compatible_workflows: [
            {
                workflow_id: "WFLOW-abc123",
                name: "Character Portraits v1"
            },
            {
                workflow_id: "WFLOW-xyz456",
                name: "Sci-Fi Landscape Generator"
            }
        ]
    },

    async onEnable() {
        // Webhook assumed to be manually configured or attached in model management panel
    },

    async onDisable() {
        // No cleanup needed, passive listening trigger
    },

    async run(context) {
        const body = context.payload.body as {
            model_id?: string;
            [key: string]: unknown;
        };

        if (body?.model_id) {
            return [body];
        }

        return [];
    },
});

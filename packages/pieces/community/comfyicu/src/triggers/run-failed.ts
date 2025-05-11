import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';

export const runFailedTrigger = createTrigger({
    name: 'run_failed',
    displayName: 'Run Failed',
    description: 'Triggers when a ComfyICU workflow run fails.',
    type: TriggerStrategy.WEBHOOK,
    props: {},

    sampleData: {
        run_id: "RUN-456def7890abc",
        workflow_id: "WFLOW-abc987654321",
        status: "FAILED",
        started_at: "2025-05-11T11:00:00Z",
        failed_at: "2025-05-11T11:02:45Z",
        error: {
            message: "CUDA out of memory",
            code: 500,
            traceback: "Traceback (most recent call last): ..."
        },
        metadata: {
            prompt: "A robot reading a book in a library",
            seed: 999,
            model: "sdxl-lightning"
        }
    },

    async onEnable() {
        // Webhook URL is registered during workflow run submission
    },

    async onDisable() {
        // No cleanup needed as webhook is not persistently registered
    },

    async run(context) {
        const body = context.payload.body as {
            status?: string;
            [key: string]: unknown;
        };

        if (body?.status === 'FAILED') {
            return [body];
        }

        return [];
    },
});

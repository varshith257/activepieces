import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';

export const runCompletedTrigger = createTrigger({
    name: 'run_completed',
    displayName: 'Run Completed',
    description: 'Triggers when a ComfyICU workflow run is completed.',
    type: TriggerStrategy.WEBHOOK,
    props: {},

    sampleData: {
        run_id: "RUN-abc1234567890xyz",
        workflow_id: "WFLOW-xyz0987654321abc",
        status: "COMPLETED",
        started_at: "2025-05-11T10:00:00Z",
        completed_at: "2025-05-11T10:03:24Z",
        output: {
            images: [
                {
                    url: "https://comfy.icu/api/v1/files/image-output-1.png",
                    width: 512,
                    height: 512,
                    type: "image/png"
                }
            ],
            logs: "Inference complete. Seed: 777. Model: DreamShaperXL"
        },
        metadata: {
            prompt: "A steampunk airship flying over a futuristic city",
            seed: 777,
            model: "dreamshaper-xl"
        }
    },

    async onEnable() {
        // No webhook registration needed (webhook URL is sent in workflow submission)
    },

    async onDisable() {
        // No webhook unregistration needed
    },

    async run(context) {
        const body = context.payload.body as {
            status?: string;
            [key: string]: unknown;
        };

        if (body?.status === 'COMPLETED') {
            return [body];
        }

        return [];
    }
});

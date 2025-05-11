
import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
import { PieceCategory } from '@activepieces/shared';

import {
  cancelRun,
  createWorkflow,
  getRunOutputs,
  getRunStatus,
  listModels,
  listWorkflows,
  setWebhook,
  submitWorkflowRun,
  runCompletedTrigger,
  runFailedTrigger,
  modelUpdatedTrigger,
  newWorkflowCreatedTrigger,
} from './lib/lib';

const markdownDescription = `
To use ComfyICU, you need an API key:

1. Sign up at [ComfyICU](https://comfy.icu).
2. Go to your Account Settings.
3. Copy your API key from the API section.
`;

export const comfyIcuAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  description: markdownDescription,
  required: true,
});
export const comfyIcu = createPiece({
  displayName: 'ComfyICU',
  description: 'Run ComfyUI-based AI image workflows in the cloud via API.',
  logoUrl: 'https://cdn.activepieces.com/pieces/comfyicu.png',
  authors: ['varshith257'],
  auth: comfyIcuAuth,
  minimumSupportedRelease: '0.36.1',
  categories: [PieceCategory.ARTIFICIAL_INTELLIGENCE],
  actions: [
    cancelRun,
    createWorkflow,
    getRunOutputs,
    getRunStatus,
    listModels,
    listWorkflows,
    setWebhook,
    submitWorkflowRun,
  ],
  triggers: [
    runCompletedTrigger,
    runFailedTrigger,
    modelUpdatedTrigger,
    newWorkflowCreatedTrigger,
  ],
});
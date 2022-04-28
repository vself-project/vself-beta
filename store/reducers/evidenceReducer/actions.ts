import { Evidence } from '../../../models/Evidence';
import { EvidenceActions } from './types';

export const addEvidence = (data: Evidence) => {
  return {
    type: EvidenceActions.AddEvidence,
    payload: { data },
  };
};
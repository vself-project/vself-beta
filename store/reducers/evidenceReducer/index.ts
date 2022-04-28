import { Reducer, AnyAction } from 'redux';
import { EvidenceActions } from './types';
import { Evidence } from '../../../models/Evidence';

// Reducer store typing
type EvidenceState = Object;

// Mapping from txhash to Evidence
const initialState: EvidenceState = {};

const eventReducer: Reducer = (state = initialState, action: AnyAction): EvidenceState => {
  switch (action.type) {
    case EvidenceActions.AddEvidence:
      //   const data = action.payload.data as Evidence;
      //   const txhash = data.txhash;
      // //   const record_id = data["_"];
      // //   console.log(record_id);
      return { ...state };
    default:
      return state;
  }
};

export default eventReducer;

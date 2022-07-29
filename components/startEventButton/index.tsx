import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { createEvent, setActiveEventStatus } from '../../store/reducers/eventReducer/actions';
import { getAccountAndContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

const StartEventButton: React.FC = () => {
  const { is_active } = useAppSelector((state) => state.eventReducer);
  const dispatch = useAppDispatch();

  const toggleEvent = async (): Promise<void> => {
    try {
      const { contract } = await getAccountAndContract(mainContractName, mainContractMethods);
      if (!is_active) {
        dispatch(createEvent());
      } else {
        dispatch(setAppLoadingState(true));
        await contract.stop_event();
        dispatch(setActiveEventStatus(false));
        dispatch(setAppLoadingState(false));
      }
    } catch (err) {
      console.log('Connection to contract ended with errors: ', err);
    }
  };

  const stateString = !is_active ? 'Start event' : 'Stop event';

  return (
    <button
      type="button"
      className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
      onClick={toggleEvent}
    >
      {stateString}
    </button>
  );
};

export default StartEventButton;

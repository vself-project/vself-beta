import React from 'react';
import { StylesCSS } from '../../constants/styles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { createEvent, setEventStatus } from '../../store/reducers/eventReducer/actions';
import { getNearAccountAndContract } from '../../utils';

const StartEventButton: React.FC = () => {
  const { is_active } = useAppSelector((state) => state.eventReducer);
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const dispatch = useAppDispatch();

  const toggleEvent = async (): Promise<void> => {
    try {
      const { contract } = await getNearAccountAndContract(account_id);
      if (!is_active) {
        dispatch(createEvent());
      } else {
        dispatch(setAppLoadingState(true));
        await contract.stop_event();
        dispatch(setEventStatus(false));
        dispatch(setAppLoadingState(false));
      }
    } catch (err) {
      console.log('Connection to contract ended with errors: ', err);
    }
  };

  const stateString = !is_active ? 'Start event' : 'Stop event';

  return (
    <button type="button" className={StylesCSS.PRIMARY_BUTTON} onClick={toggleEvent}>
      {stateString}
    </button>
  );
};

export default StartEventButton;

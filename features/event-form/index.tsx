/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { setEventStatus, stopCreateEvent } from '../../store/reducers/eventReducer/actions';
import { hash, resizeFile } from '../../utils';
// Models and types
import { Quest, EventData } from '../../models/Event';
import QuestComponent, { QuestChangeCallback } from './quests';
// Components
import Modal from '../../components/modal';
import { mockEvent } from '../../mockData/mockEvents';
import { uploadImageToFirebase } from '../../utils/firebase';
import { SpinnerLoader } from '../../components/loader';
import { getAccountAndContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';
import RemoveIcon from '../../components/icons/RemoveIcon';
import UploadImageButton from '../../components/uploadImageButton';
import EventConfirm from './event-confirm';

const initialQuest: Quest = {
  qr_prefix_enc: '',
  qr_prefix_len: 0,
  reward_description: '',
  reward_title: 'New Quest #1',
  reward_uri: '',
};

const initialEventFormState: EventData = {
  event_name: '',
  event_description: '',
  quests: [initialQuest],
  start_time: new Date().getTime() * 1000000,
  finish_time: new Date().getTime() * 1000000,
};

const NewEventForm: React.FC = () => {
  const [eventFormState, setEventFormState] = useState<EventData>(initialEventFormState);
  const { event_name, event_description, quests, start_time, finish_time } = eventFormState;
  const [files, setFiles] = useState<File[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [submitedEvent, setSubmitedEvent] = useState<EventData | undefined>();
  const { is_starting } = useAppSelector((state) => state.eventReducer);
  const { account_id } = useAppSelector((state) => state.userAccountReducer);
  const { is_dev } = useAppSelector((state) => state.appStateReducer);

  useEffect(() => {
    if (is_dev) {
      setEventFormState(mockEvent);
    }
  }, [is_dev]);

  const dispatch = useAppDispatch();

  // New Event Form Handlers
  const onEventTitleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const eventName = event.currentTarget.value;
    setEventFormState((prevState) => ({ ...prevState, event_name: eventName }));
  };

  const onEventDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const eventDescription = event.currentTarget.value;
    setEventFormState((prevState) => ({ ...prevState, event_description: eventDescription }));
  };

  const onStartTimeChange = (date: Date): void => {
    setEventFormState((prevState) => ({ ...prevState, start_time: date.getTime() * 1000000 }));
  };

  const onFinishTimeChange = (date: Date): void => {
    setEventFormState((prevState) => ({ ...prevState, finish_time: date.getTime() * 1000000 }));
  };

  // Quest/Actions Form Handlers
  const onQuestChange: QuestChangeCallback = (index, field, value): void => {
    const editedQuest = {
      ...quests[index],
      [field]: value,
    };
    const newQuests = [...quests];
    newQuests[index] = editedQuest;

    setEventFormState((prevState) => ({ ...prevState, quests: newQuests }));
  };

  const addNewQuest = (): void => {
    const newQuests = [...quests];
    newQuests.push({ ...initialQuest, reward_title: 'New Quest #' + (quests.length + 1) });
    setEventFormState((prevState) => ({ ...prevState, quests: newQuests }));
  };

  const removeQuest = (index: number): void => {
    const newQuests = [...quests];
    newQuests.splice(index, 1);
    files.splice(index, 1);
    setEventFormState((prevState) => ({ ...prevState, quests: newQuests }));
  };

  const setFilesArray = (file: File, index: number) => {
    const newFilesArray = [...files];
    newFilesArray[index] = file;
    setFiles(newFilesArray);
  };

  // Submitting Form
  const onNewEventSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    // Setting New Event
    setSubmitedEvent({
      event_name,
      event_description,
      finish_time,
      start_time,
      quests,
    });
  };

  const closeModal = (): void => setSubmitedEvent(undefined);

  // Uploading Images to Firebase and Start New Event after success
  useEffect(() => {
    const startNewEvent = async () => {
      try {
        // Resize Images Before Upload
        const resizedImgsPromises = files.map(resizeFile);
        const resizedFiles = await Promise.all(resizedImgsPromises);
        // Upload Images To Firebase And Getiing Download URLS
        const promises = resizedFiles.map(uploadImageToFirebase);
        const urls = await Promise.all(promises);
        dispatch(setAppLoadingState(true));
        // Placing URLS of Images to Request
        const questsWithUrls = quests.map((quest: Quest, index: number) => {
          if (urls[index] === undefined) return;
          // Setting URLS of Uploaded Images To Quests
          const hashedPrefix = hash(quest.qr_prefix_enc);
          const prefixLength = quest.qr_prefix_enc.length;
          return {
            ...quest,
            qr_prefix_enc: hashedPrefix,
            qr_prefix_len: prefixLength,
            reward_uri: urls[index],
          };
        });
        // Starting New Event In NEAR

        const { contract } = await getAccountAndContract(mainContractName, mainContractMethods);
        await contract.start_event({
          event: {
            event_description,
            event_name,
            finish_time,
            start_time,
            quests: questsWithUrls,
          },
        });
        dispatch(setEventStatus(true));
        dispatch(stopCreateEvent());
        dispatch(setAppLoadingState(false));
      } catch (err) {
        console.log('Connection to contract ended with errors: ', err);
        dispatch(setAppLoadingState(false));
      }
    };
    if (is_starting) {
      startNewEvent();
    }
  }, [account_id, dispatch, event_description, event_name, files, finish_time, is_starting, quests, start_time]);

  if (is_starting) {
    return <SpinnerLoader />;
  }

  return (
    <>
      <Modal wFull isOpened={!!submitedEvent} closeCallback={closeModal} title={'Confirm New Event'}>
        <EventConfirm eventData={submitedEvent} files={files} />
      </Modal>

      <form onSubmit={onNewEventSubmit} className="flex-row flex container">
        <div className="mx-2 p-5 rounded-lg shadow-lg bg-white min-w-1/3 w-1/3 relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2">New Event</h5>
          <div className="justify-center w-full flex mt-2">
            <img className="rounded-t-lg mb-3" src="/vvs.png" alt="" style={{ height: 180 }} />
          </div>
          <input
            autoComplete="off"
            type="text"
            name="title"
            onChange={onEventTitleChange}
            value={event_name}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event title"
          />
          <textarea
            name="description"
            value={event_description}
            onChange={onEventDescriptionChange}
            className="form-control block w-full mb-2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event description"
          />
          <span className="mb-2 text-black">Start Date:</span>
          <span className="flex-row flex justify-between my-2 cursor-pointer">
            <DatePicker
              onChange={onStartTimeChange}
              selected={new Date(start_time / 1000000)}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <span className="mb-4 text-black">End Date:</span>
          <span className="flex-row flex justify-between my-2 cursor-pointer align-middle">
            <DatePicker
              onChange={onFinishTimeChange}
              selected={new Date(finish_time / 1000000)}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <div className="border-t-2 pt-5 mt-[auto] ">
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Create New Event
            </button>
          </div>
        </div>

        <div className="flex-col flex mx-2 p-5 rounded-lg shadow-lg bg-white min-w-1/3 w-1/3 relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2">New Quest</h5>
          <div className="flex flex-col overflow-y-scroll h-screen relative" style={{ maxHeight: 520 }}>
            <UploadImageButton
              file={files[activeIndex]}
              onImageSet={(file: File): void => {
                setFilesArray(file, activeIndex);
              }}
            />
            <QuestComponent
              quest={quests[activeIndex]}
              onQuestChange={onQuestChange}
              index={activeIndex}
              removeQuest={removeQuest}
              setFilesArray={setFilesArray}
            />
          </div>
        </div>
        <div className="flex flex-col mx-2 p-5 rounded-lg shadow-lg bg-white min-w-1/3 w-1/3 relative text-black">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Quests</h5>
          <ul className="max-h-[500px] overflow-y-auto">
            {quests.map((quest, index) => (
              <li key={index} className="flex flex-row py-1 justify-between my-1 border-b-2 hover:bg-slate-100">
                <button type="button" onClick={() => setActiveIndex(index)}>
                  <span>{quest.reward_title}</span>
                </button>
                {quests.length >= 2 && (
                  <button onClick={() => removeQuest(index)} type="button">
                    <RemoveIcon />
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="border-t-2 pt-5 mt-[auto] ">
            <button
              type="button"
              onClick={addNewQuest}
              className="inline-block px-6 py-2.5 bg-zinc-300 text-black hover:text-zinc-300 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-zinc-600 hover:shadow-lg focus:bg-zinc-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add New Quest
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewEventForm;

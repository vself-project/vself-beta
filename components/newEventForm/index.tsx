/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setAppLoadingState } from '../../store/reducers/appStateReducer/actions';
import { setEventStatus, stopCreateEvent } from '../../store/reducers/eventReducer/actions';
import { getNearAccountAndContract, hash, resizeFile } from '../../utils';
// Models and types
import { Quest, EventData } from '../../models/Event';
import QuestComponent, { QuestChangeCallback } from './quests';
// Components
import Spinner from '../spinner';
import EventCard from '../eventsTable/eventCard';
import Modal from '../modal';
import Accordion from '../accordion';
import { mockEvent } from '../../mockData/mockEvents';
import { uploadImageToFirebase } from '../../utils/firebase';

const initialQuest: Quest = {
  qr_prefix_enc: '',
  qr_prefix_len: 0,
  reward_description: '',
  reward_title: '',
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
    newQuests.push(initialQuest);
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
          const prefixLength = hashedPrefix.length;
          return {
            ...quest,
            qr_prefix_enc: hashedPrefix,
            qr_prefix_len: prefixLength,
            reward_uri: urls[index],
          };
        });
        // Starting New Event In NEAR
        const { contract } = await getNearAccountAndContract(account_id);
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
      }
    };
    if (is_starting) {
      startNewEvent();
    }
  }, [account_id, dispatch, event_description, event_name, files, finish_time, is_starting, quests, start_time]);

  return (
    <>
      {submitedEvent && (
        <>
          <div className="bg-black fixed top-0 left-0 w-full h-full flex bg-opacity-60 z-50"></div>
          <Modal closeCallBack={closeModal} modalTitle={is_starting ? 'Creating New Event' : 'Confirm New Event'}>
            {is_starting ? <Spinner /> : <EventCard eventData={submitedEvent} detailed files={files} />}
          </Modal>
        </>
      )}

      <form onSubmit={onNewEventSubmit} className="flex-row flex flex-wrap container">
        <div className="flex-0 form-group mb-6 p-6 pb-0 rounded-lg shadow-lg bg-white max-w-md w-1/2 relative">
          <h5 className="text-gray-900 text-xl font-medium mb-2">New Event</h5>
          <img className="rounded mb-4" src="/meta.jpg" alt="" />
          <input
            autoComplete="off"
            type="text"
            name="title"
            onChange={onEventTitleChange}
            value={event_name}
            className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            mb-2
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event title"
          />
          <textarea
            name="description"
            value={event_description}
            onChange={onEventDescriptionChange}
            className="form-control
            block
            w-full
            mb-2
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Event description"
          />
          <span className="mb-2 ">Start Date:</span>
          <span className="flex-row flex justify-between mb-2 cursor-pointer">
            <DatePicker
              onChange={onStartTimeChange}
              selected={new Date(start_time / 1000000)}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <span className="mb-4 ">End Date:</span>
          <span className="flex-row flex justify-between mb-2 cursor-pointer align-middle">
            <DatePicker
              onChange={onFinishTimeChange}
              selected={new Date(finish_time / 1000000)}
              dateFormat="dd/MM/yyyy"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            {/* <CalendarIcon /> */}
          </span>
          <div className="mt-5 absolute bottom-6 left-6">
            <button
              type="submit"
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-200 hover:bg-opacity-6 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
            >
              Create New Event
            </button>
          </div>
        </div>

        <div className="flex-1 flex-row ml-4 form-group mb-6 p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Quests</h5>
          <div className="flex flex-col overflow-y-scroll h-screen relative" style={{ maxHeight: 520 }}>
            {quests.map((quest, index) => (
              <Accordion
                key={index}
                accordionTitle={`Quest #${index + 1}`}
                activeIndex={activeIndex}
                currentIndex={index}
                activeIndexCallback={setActiveIndex}
              >
                <QuestComponent
                  quest={quest}
                  onQuestChange={onQuestChange}
                  index={index}
                  removable={quests.length >= 2}
                  removeQuest={removeQuest}
                  setFilesArray={setFilesArray}
                />
              </Accordion>
            ))}
          </div>
          <div className="mt-5 border-t-2 pt-5">
            <button
              type="button"
              onClick={addNewQuest}
              className="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-200 hover:bg-opacity-6 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
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

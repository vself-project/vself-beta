/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
// Models and types
import { Quest } from '../../../models/Event';
// Components And Styles
import UploadImageButton from '../../../components/uploadImageButton';
import { StylesCSS } from '../../../constants/styles';

export type QuestChangeCallback = (index: number, field: string, value: string, file?: File) => void;

interface QuestProps {
  quest: Quest;
  index: number;
  onQuestChange: QuestChangeCallback;
  removeQuest: (index: number) => void;
  setFilesArray: (file: File, index: number) => void;
}

const QuestComponent: React.FC<QuestProps> = ({ quest, index, onQuestChange, setFilesArray }) => {
  const onInputChange = (event: React.FormEvent<HTMLInputElement>): void => {
    onQuestChange(index, event.currentTarget.name, event.currentTarget.value);
  };

  const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onQuestChange(index, event.target.name, event.target.value);
  };

  // useEffect(() => {

  // }, [])

  return (
    <>
      <input
        autoComplete="off"
        type="text"
        name="qr_prefix_enc"
        onChange={onInputChange}
        value={quest.qr_prefix_enc}
        className={StylesCSS.INPUT}
        placeholder="qr_prefix_enc"
      />
      <input
        autoComplete="off"
        type="text"
        name="reward_title"
        onChange={onInputChange}
        value={quest.reward_title}
        className={StylesCSS.INPUT}
        placeholder="reward_title"
      />
      <textarea
        name="reward_description"
        onChange={onTextAreaChange}
        value={quest.reward_description}
        className={StylesCSS.TEXTAREA}
        placeholder="reward_description"
      />
    </>
  );
};

export default QuestComponent;

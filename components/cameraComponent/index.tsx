import React, { useRef, useEffect } from 'react';

const CameraComponent: React.FC = () => {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    const videoref = ref.current;
    const startCamera = async () => {
      if (videoref !== null) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          mediaStream = stream;
          videoref.srcObject = stream;
          videoref.play();
        }
      }
    };
    startCamera();
    return () => {
      if (videoref !== null) {
        videoref.pause();
        videoref.src = '';
        mediaStream &&
          mediaStream.getTracks().forEach((track) => {
            track.stop();
          });
      }
    };
  }, []);

  return (
    <>
      <video className="h-full w-full mx-auto" id="video" ref={ref} autoPlay muted />
      <button>Take picture</button>
    </>
  );
};

export default CameraComponent;

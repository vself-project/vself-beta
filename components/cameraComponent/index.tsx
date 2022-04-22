import React, { useRef, useEffect, useState } from 'react';
import { StylesCSS } from '../../constants/styles';

interface CameraComponentProps {
  cameraCallback?: (file: File) => void;
  closeCallback?: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ cameraCallback, closeCallback }) => {
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const takePicture = () => {
    const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
    if (ctx && ref.current && canvas.current) {
      ctx.drawImage(ref.current, 0, 0, canvas.current?.width, canvas.current?.height);
      setIsCaptured(true);
      canvas.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'image.png');
          setImgFile(file);
        }
      });
    }
  };

  const acceptPicture = () => {
    if (imgFile && imgFile !== undefined && cameraCallback && closeCallback) {
      cameraCallback(imgFile);
      closeCallback();
    }
  };

  const cancelPicture = () => {
    setIsCaptured(false);
  };

  // Starting Web Camera
  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    const videoref = ref.current;
    const startCamera = async () => {
      if (videoref !== null) {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false,
            });
            mediaStream = stream;
            videoref.srcObject = stream;
            videoref.play();
          } catch (err) {
            console.log('errr');
          }
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
  }, [isCaptured]);

  return (
    <>
      {!isCaptured && (
        <>
          <video className="h-full w-full mx-auto" id="video" ref={ref} autoPlay muted playsInline>
            Video stream not available.
          </video>
        </>
      )}

      <canvas id="canvas" ref={canvas} height={265} width={465} style={{ display: !isCaptured ? 'none' : 'block' }} />
      <div className="text-center mt-2">
        {isCaptured ? (
          <>
            <button type="button" className={StylesCSS.PRIMARY_BUTTON} onClick={acceptPicture}>
              Accept
            </button>
            <button type="button" className={StylesCSS.PRIMARY_BUTTON} onClick={cancelPicture}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" className={StylesCSS.PRIMARY_BUTTON} onClick={takePicture}>
            Take picture
          </button>
        )}
      </div>
    </>
  );
};

export default CameraComponent;

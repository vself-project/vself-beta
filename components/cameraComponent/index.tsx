import React, { useRef, useEffect, useState } from 'react';
import PictureButtonIcon from '../icons/PictureButton';

interface CameraComponentProps {
  cameraCallback?: (file: File) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ cameraCallback }) => {
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const ref = useRef<HTMLVideoElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const takePicture = () => {
    const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
    if (ctx && ref.current && canvas.current) {
      ctx.drawImage(ref.current, 0, 0, ref.current.clientWidth, canvas.current?.height);
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
    if (imgFile && imgFile !== undefined && cameraCallback) {
      cameraCallback(imgFile);
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
        // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              aspectRatio: 9 / 16,
              facingMode: 'environment',
            },
            audio: false,
          });
          mediaStream = stream;
          videoref.srcObject = stream;
          videoref.play();
        } catch (err) {
          console.log('errr');
        }
        // }
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
    <div className="flex content-center flex-wrap h-screen">
      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {!isCaptured && (
          <div>
            <video
              className="h-full mx-auto w-full"
              id="video"
              ref={ref}
              style={{ objectFit: 'initial', height: 500, width: 300 }}
              autoPlay
              muted
              playsInline
            >
              Video stream not available.
            </video>
          </div>
        )}
        <div className="flex flex-1 w-full" style={{ display: !isCaptured ? 'none' : 'flex', alignSelf: 'center' }}>
          <canvas id="canvas" ref={canvas} height={500} style={{ width: '100%' }} />
        </div>
        <div className="text-center mt-8 flex-col">
          <button type="button" onClick={takePicture} disabled={isCaptured}>
            <PictureButtonIcon />
          </button>
        </div>
        {isCaptured && (
          <div className="flex justify-between mt-4">
            <button type="button" className="text-white uppercase px-5" onClick={cancelPicture}>
              Retake
            </button>
            <button type="button" className="bg-white text-black uppercase px-5" onClick={acceptPicture}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;

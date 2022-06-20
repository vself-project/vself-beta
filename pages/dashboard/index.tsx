/* eslint-disable no-prototype-builtins */
import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TransactionsBlock from '../../features/dashboard/transactionsBlock';
import URLImageComponent from '../../components/urlImage';
import EvidenceBlock from '../../features/dashboard/evidenceBlock';
import { Evidence } from '../../models/Evidence';
import MapBlock from '../../features/dashboard/mapBlock';
import HashDoxIcon from '../../components/icons/HashDoxIcon';

const DashboardPage: NextPage = () => {
  // Refreshing Evidences Every 60 Seconds
  const [evidences, setEvidences] = useState([]);
  const _from = 0;
  const _limit = 1000;

  useEffect(() => {
    let timeOutID: any;
    const getEvidences = async (from: number, limit: number) => {
      try {
        const response = await fetch('api/get-evidences?from_index=' + from + '&limit=' + limit);
        const { result } = await response.json();
        const reversedOrder = result
          .slice(0)
          .filter(
            (a: any) =>
              a.media_hash !== 'keepyoumotivatedwhileyoulearn' &&
              a.media_hash !== 'b9d3b258647c0e57901c6f68ecff1a270f4afb8b19cb660f65d0b81c6b372d89'
          )
          .reverse();
        setEvidences(reversedOrder);
      } catch (err) {
        console.log(err);
      }
      timeOutID = setTimeout(() => {
        getEvidences(from, limit);
      }, 60000);
    };
    getEvidences(_from, _limit);

    return () => {
      clearTimeout(timeOutID);
    };
    // setEvidences(mockEvidences);
  }, []);

  // Switching Active Evidence Every 15 Seconds
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState(0);
  const [imgUrl, setImgUrl] = useState('');
  const counter = useRef(0);

  useEffect(() => {
    let newIndex = 0;
    const activeLi = document.getElementById('activeEvidenceIndex');
    if (activeEvidenceIndex < evidences.length - 1) {
      counter.current += 1;
      newIndex = activeEvidenceIndex + 1;
    }
    activeLi &&
      activeLi.scrollIntoView({
        behavior: 'smooth',
      });

    const getImageSource = (evidence: Evidence) => {
      try {
        const { metadata, media_hash } = evidence;
        if (metadata === 'preloaded' || metadata === '') {
          //return '/pow/' + media_hash + '.png';
          //https://console.firebase.google.com/project/hashdox/storage/hashdox.appspot.com/files/~2Fpreloaded
          return (
            'https://firebasestorage.googleapis.com/v0/b/hashdox.appspot.com/o/preloaded%2F' +
            media_hash +
            '.png?alt=media'
          );
        }
        const metadataObject = JSON.parse(metadata);
        if (metadataObject.hasOwnProperty('uploadThrough') && metadataObject.uploadThrough == 'server') {
          // Images uploaded by mobile app
          return 'https://82.148.29.178/images/' + media_hash + '.png';
        }
        // Get url of image storaged in firebase (uploaded through firebase)
        return (
          'https://firebasestorage.googleapis.com/v0/b/hashdox.appspot.com/o/images%2F' + media_hash + '.png?alt=media'
        );
      } catch (err) {
        console.log(err);
        return '';
      }
    };

    const timer = setTimeout(() => {
      setActiveEvidenceIndex(newIndex);
      const source = getImageSource(evidences[newIndex]);
      setImgUrl(source);
    }, 15000);

    return () => clearTimeout(timer);
  }, [activeEvidenceIndex, evidences]);

  const changeTransactionInTable = (index: number) => {
    setActiveEvidenceIndex(index);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="flex flex-1 flex-col" style={{ minWidth: '50%' }}>
          <TransactionsBlock
            evidences={evidences}
            activeEvidenceIndex={activeEvidenceIndex}
            callback={changeTransactionInTable}
          />
        </div>
        <div className="flex flex-1 justify-center align-center" style={{ minWidth: '50%' }}>
          {imgUrl === '' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                minWidth: '50%',
              }}
            >
              <div className="animate-spin-slow">
                <HashDoxIcon />
              </div>
            </div>
          ) : (
            <URLImageComponent url={imgUrl} className="mx-4 rounded self-center max-h-[400px]" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col sm:flex-row">
        {/* {getMapBlock()} */}
        <div className="flex flex-1 justify-center pb-[40px]" style={{ minWidth: '50%' }}>
          <MapBlock evidence={evidences[activeEvidenceIndex]} />
        </div>
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            minWidth: '50%',
          }}
        >
          <div className="animate-spin-slow">
            <HashDoxIcon />
          </div>
        </div> */}
        <div className="flex flex-1 justify-center pb-[40px]" style={{ minWidth: '50%' }}>
          <EvidenceBlock evidence={evidences[activeEvidenceIndex]} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'hashdox'])),
    },
  };
}

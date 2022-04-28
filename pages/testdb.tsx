import type { NextPage } from 'next';
import { useEffect } from 'react';

import Gun from 'gun';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addEvidence } from '../store/reducers/evidenceReducer/actions';
import { Evidence } from '../models/Evidence';

const TestDB: NextPage = () => {
  const dispatch = useAppDispatch();
  const evidence = useAppSelector( state => state.evidenceReducer );

  const gun = Gun(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
  const evidenceRef = gun.get('evidence3').get('txhash');

  useEffect(() => {       
    evidenceRef.on((data, _key) => {
      const record: Evidence = {          
        txhash: data.txhash,
        filehash: data.filehash,
        metadata: data.metadata,
      }      
      dispatch(addEvidence(record));
    });
    return () => {
      evidenceRef.off();
    };
  }, [])

  return Object.keys(evidence).map((item, index) => <p key={index}>Hello {item}</p>);
};

export default TestDB;

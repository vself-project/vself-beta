import { Evidence } from '../models/Evidence';

// Preloaded transaction hashes
export const txHashes: any = {
  '99db50f86507b2756183d829efc86eb70357d37c186e583cfb6979cfdcfab89e': {
    tx: '998iKsTJJWi4buN5YbiYVxYs2MJeqfL3GQRwqmCh4WcR',
    time: 'April 29, 2022 at 8:27:14am',
  },
  '4e00110557e83f12f8dfa28a62d3e9ca0e364859f0dbe984e605a165de4ffc7a': {
    tx: '8GAnELPCo2VZHLQ61LrF9FsTEgAFsvQ3gRfHKNreWEon',
    time: 'April 29, 2022 at 8:27:19am',
  },
  '5ae03c532ff376172511940f2dc08b2898eca8342168f3d8cc384f07951bd859': {
    tx: 'DWf5BnqLPoSiBfGJDSxmcS5Vhkq4ff1xDRbqB3NsFjvT',
    time: 'April 29, 2022 at 8:27:25am',
  },
  '7e907833c6233ff27c5f928fd1c60cf5112381675258925c1676b5a3a2231835': {
    tx: 'FVBFN4dax9H8fJykiTs6Buau4csL2dc7CRSycnqX35ba',
    time: 'April 29, 2022 at 8:27:30am',
  },
  '9a7516f8e2edf3d13e04e66d3eb8de4cd236e66f49a513e8a5b9b247906af72b': {
    tx: 'ABhVtxHeXDHhKX28xnTqNFhcDqskQXMVUtwYmreGyyVg',
    time: 'April 29, 2022 at 8:27:35am',
  },
  '395addc5cdbf628e273e3e059c16c08dcb65d432848756d35ab898742177ecd4': {
    tx: 'CoXFvzxNQUoeEir2WywzdxgxfjvM7tYDfiF6vVeLprmk',
    time: 'April 29, 2022 at 8:27:41am',
  },
  '1778955f366bb24ca9f1ca74646768ad44c419cc8cb31dfd19ea38f1ab158369': {
    tx: '2VY59bktqdpX91J4GiXpx5cDDfiwevvtZJ6jtWnPLBqt',
    time: 'April 29, 2022 at 8:27:53am',
  },
  '9825679226b72456cd082d75bbd6a845d8ceadfa506fcc978b30f54723db6b78': {
    tx: '6SvSjHm5yRLDay3ugVV6KUsFQT2q5LTA4VBy4P1vaCVJ',
    time: 'April 29, 2022 at 8:27:59am',
  },
  '69407975431f5177f7e9bb3252a399669192bdf007da1cb524a023bcc30d9dc5': {
    tx: 'CFvKsfSuy7T9FB1x8iUyJemRQPVHtPDRnGC2XZHG2Fyu',
    time: 'April 29, 2022 at 8:28:05am',
  },
  e56824cfb04e44dd3115db9dc47811eda59b1cd692a2a8a494c2b09145b68b85: {
    tx: '3vhyPHNo1t3ZrY7KeLAFZt9RPrWeHqDGAUnZCM362nhF',
    time: 'April 29, 2022 at 8:28:11am',
  },
  '52221bef0ca8d2420ed1e7f84b36b0a9ef2f0cb88a456b0c755e64863ff9d742': {
    tx: 'DfjwFiyYmXi6r3oYsXGAFjahhzrqQLx5iqJsqPe1Saa2',
    time: 'April 29, 2022 at 7:26:15pm',
  },
  '575b37610e2f291a4169fe8e53fabf53cec6015f9cbcd8958432fd3086f666d7': {
    tx: '2H8v7KwarZK4arBrSpG6jK29j9NUECNc7yki2mC2FGWH',
    time: 'April 29, 2022 at 7:29:09pm',
  },
  '0e6c69ac3f32571ccb306b464baa19737e3aa806d1a13c3a0d59a92ace089aef': {
    tx: 'ApatVuUryL8K8VXEkxdBVkYRSNoCR2xvLCcbVh1BZQAD',
    time: 'April 29, 2022 at 7:32:37pm',
  },
  e7ec3851cb1baaac937cb7a6e0aa3f1323abf4774c7a7c330e28216120618b4c: {
    tx: 'DyJh3QkyVBahMZoMRyTtkVmaQGHJBT4KEsPfHnJCyouJ',
    time: 'April 29, 2022 at 8:08:40pm',
  },
  '7facc19931429f42de0bf3f6c4735d171183c4069670a3d7a290888f7d2ae53a': {
    tx: '5R1bxAAtPm5PrHBiSsJz7jRTDFcwWWsH4V8EwRdrLuzr',
    time: 'April 29, 2022 at 8:10:38pm',
  },
  '5c3c178b57bbe2faba1dd1150b852158c674699c50d0801333739734dd9f7d73': {
    tx: 'Gr6qUj17x5oCTQPBfnzo5YGJpxrqKyFjicaSAg66wJL7',
    time: 'April 29, 2022 at 8:13:21pm',
  },
  '77eac822c34221f1392c042750c140ce44d5ef13bce52450d07d5c5043c77f31': {
    tx: '9cRx6TjzgZa8phx93guvVhxNCqc7RVyKfRtwReddLjjr',
    time: 'April 29, 2022 at 8:14:56pm',
  },
  '8ec9f787365e469a6b56ee5800a76c85e0f616435220208e4c673a406e5b0b39': {
    tx: 'B8dThBKqrCDQGmSdF1HsYcpZU7DuFhgb9E4ZKm7T9j3',
    time: 'April 29, 2022 at 8:16:12pm',
  },
  // Masha
  ab0ebefcbb2e4de5ed999f1f34c5183d608539527dd00be8a7643a70157d7b5d: {
    tx: '9DHKcuXbEf9zsmhiEL6Cf5Qj5yLnETa99KKFoVNEVePi',
    time: 'April 29, 2022 at 9:35:23pm',
  },
  d4f5d8233eb544ad78e93cd985c4278a4328c3d7c752774076221528ff09e2a6: {
    tx: '3ePRsdYuhSLWyt5dDgwPV3YAQETGoa21GzUnwYp6E4az',
    time: 'April 29, 2022 at 9:36:59pm',
  },
  e02485b1ed3d2e4f179c8abc5fa95a7b6ed750b17f9c94f7428279e5f6bf0894: {
    tx: 'GnN5S3qw5QF8wVqHWGNiK3nXS3P9tqM4mUEkokk8FRjd',
    time: 'April 29, 2022 at 9:38:49pm',
  },
  // Video previews
  '7a14fdff826f8dc3b83152235aa754f990f8c3e5957991356e83e420720ede9e': {
    tx: '2ma2dqmnXTAcp8y8c1avucN581Mnsfc6qLyn1mYZYQWV',
    time: 'April 29, 2022 at 8:46:33pm',
  },
  //"": { tx: "", time: ""},
};

export const mockEvidences: Evidence[] = [
  {
    media_hash: '97ddff1e367be9d80e6ba7c109028203',
    metadata: '{"name":"Alex","time":"4/21/2022 3:57:57 PM","location":"41.69804N 44.80519E","uploadThrough":"server"}',
  },
  {
    media_hash: '689bb00ad043497f885fd91209d7e9c1',
    metadata: '{"name":"Alex","time":"4/21/2022 3:59:26 PM","location":"41.69101N 44.80069E","uploadThrough":"server"}',
  },
  {
    media_hash: '67b30ec070298ebefb77936308f6a371',
    metadata: '{"name":"Alex","time":"4/21/2022 3:54:00 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '1ae5c72cd2ddc93149d1cfc2bc1b432f930f4a0d7f827cb988a9f51aad3bd46a',
    metadata: '{"date": "Wed Apr 13 2022 20:17:28 GMT+0300 (Москва, стандартное время)", "location":"unknown"}',
  },
  {
    media_hash: '64f7014beb71c8826831044f2c8c192ca73b34f99c0d8adf1ce144d287613249',
    metadata:
      '{"downloadUrl":"https://firebasestorage.googleapi","Filter":"Adaptive","Interlace":"Noninterlaced","location":"{"latitude":"43.93653888888888","longitude":"12.4466"}"}',
  },
  {
    media_hash: 'd367eb6bae74ee2c83e1141fa998963d5c6874c682376e349978b714dc81eb8e',
    metadata: '{"downloadUrl":"https://firebasestorage.googleapis","1111":66,"1112":51,"1113":65,"1114":0,"1115":0}',
  },
  {
    media_hash: 'b2d5d2e97fbd1ca6f5f4f5951c711c3957ae79d24a4f6e6386749dde08bea804',
    metadata:
      '{"downloadUrl":"https://firebasestorage.googleapis","polution":37,"ThumbnailWidth":0,"ThumbnailHeight":0}',
  },
  {
    media_hash: 'd367eb6bae74ee2c83e1141fa998963d5c6874c682376e349978b714dc81eb8e',
    metadata: '{"downloadUrl":"https://firebasestorage.googleapis","1111":66,"1112":51,"1113":65,"1114":0,"1115":0}',
  },
  {
    media_hash: '0e90aceaac33398232ba10faf56e5b7c',
    metadata: '{"name":"Alex","time":"4/21/2022 3:57:57 PM","location":"41.69804N 44.80519E","uploadThrough":"server"}',
  },
  {
    media_hash: '689bb00ad043497f885fd91209d7e9c1',
    metadata: '{"name":"Alex","time":"4/21/2022 3:59:26 PM","location":"41.69101N 44.80069E","uploadThrough":"server"}',
  },
  {
    media_hash: 'bdd5f8f6de26c896da2e5793e35e08c4',
    metadata: '{"name":"Alex","time":"4/21/2022 4:00:22 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '60bb086f30daffbe5f32cb6b46e56562',
    metadata: '{"name":"Alex","time":"4/21/2022 8:25:37 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'd106e7ede8392263d926a9b88df2ba45',
    metadata: '{"name":"Alex","time":"4/21/2022 8:26:35 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'de1b8ea795e95100fbae592aa1c2430a',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 8:37:21 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '2d08d5892eac2fb221c49992130b1547',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 8:47:39 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '7d51b9e53a312e9e267611ae08f2c54e',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 8:59:17 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '4d15178affe7a9b34a72c31f3c76e224',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 9:05:44 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '2d4f5771fb93a5e04cd92237bd1a0f28',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 9:19:23 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'd6e4acb5677ad6fabe2270a7f43318ab',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 9:19:46 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'e44dcb4e2aecd74d40349f217a529908',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 9:26:16 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'bfc70a19e26e3a8c08bcaa065b5e3146',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 9:26:49 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '99e85ff3e3e9be1d3511fa9805cdf1d1',
    metadata: '{"name":"Bratandronik","time":"4/21/2022 9:43:08 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'bb50bc6b214e5fe4cb6d8a41bdd01993',
    metadata: '{"name":"Hhgff","time":"4/21/2022 9:54:43 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'c8ce08bf3d57da40bfbe029b85595a57',
    metadata: '{"name":"Hhgff","time":"4/21/2022 10:01:08 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '7944350091e54d5096028534f3d7a71b',
    metadata: '{"name":"Gggg","time":"4/22/2022 12:18:36 AM","loc…n":"(41.725, 44.74586)","uploadThrough":"server"}',
  },
  {
    media_hash: '6d316b0c799e6cac4b37b10b426f1229',
    metadata: '{"name":"","time":"4/22/2022 12:34:33 AM","locatio…:"(41.72498, 44.74586)","uploadThrough":"server"}',
  },
  {
    media_hash: '553139364c97e64178e22bc5d647b30e',
    metadata: '{"name":"Thh","time":"4/22/2022 12:35:47 AM","loca…:"(41.72498, 44.74586)","uploadThrough":"server"}',
  },
  {
    media_hash: 'c9526cd70378e0eadacfa64c40d643b4',
    metadata: '{"name":"Thh","time":"4/22/2022 12:49:27 AM","loca…:"(41.72501, 44.74585)","uploadThrough":"server"}',
  },
  {
    media_hash: 'b1ad5acbfe3ef1e858e28aedbb4332cc',
    metadata: '{"name":"Alex","time":"4/22/2022 9:16:47 AM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '5f4276f89e2cc858a4817ee0e7d70880',
    metadata: '{"name":"Alex","time":"4/22/2022 9:24:45 AM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '87f1a9595e67512e3ab7c6695b3aee3a',
    metadata: '{"name":"Alex","time":"4/22/2022 9:34:36 AM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'b1282d983d051bbbc62998c26d41c00e',
    metadata: '{"name":"","time":"4/22/2022 11:22:55 AM","locatio…:"(41.69795, 44.80509)","uploadThrough":"server"}',
  },
  {
    media_hash: 'c072a499a967fc91876e3bbcc5c67b61',
    metadata: '{"name":"Ggggg","time":"4/23/2022 12:29:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'e9207dd0bbf541deb4b1bd373bf7e8c3',
    metadata: '{"name":"Hhjj","time":"4/23/2022 12:39:13 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '91253aafb329263c56dde1dd6599a0c9',
    metadata: '{"name":"Ggggggggggggggg","time":"4/23/2022 3:01:1…M","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '5b5f6b2f7bf890c4527c16a557c3ea13',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 3:35:10 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '6193532e62f53807794992d985826011',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 3:43:48 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '195bd2d12e3427cf96bb84265edf537e',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 3:46:52 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '430c241447d872c5b182ee16e1f7947a',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 3:47:44 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '0ae3154ee59989da6723e4ea6c571ef3',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 3:49:23 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'error',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'error',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'kjhafklash',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'kjhafklash',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '3b24201986dfa674edba3814631509b3',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 5:08:47 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '3a5937b7c6deab2858ba363a9cacbc55',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 5:11:33 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '2c6b410996beaeb19e2c78bfbc9e44d1',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 5:20:15 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '2ce812b8c6a96f682e8fcda33fb01a7d',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 5:42:33 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '27ccb35fbf6067986e18f9724dfbc716',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 5:58:45 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'kjhafklash',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'kjhafkladdssss',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'imagehashik',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'imagehashik2',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '59bc6d42372709c43a65cec38d9eb39e',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 7:29:32 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '09efcaecd7b2cabf60da047f80b2d00b',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 7:40:41 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '247aad3af08b28a2ddf21becee5bd1ec',
    metadata: '{"name":"Bratandronik","time":"4/23/2022 9:35:41 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'e96d0b07994c3b6c33927b2087188d77',
    metadata: '{"name":"Bratandronik","time":"02.04.2022 22:09:56….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '0efc9cb69765ba2297f43f5759f9208a',
    metadata: '{"name":"Xren","time":"4/23/2022 10:28:01 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '0b91656f1294581e840e1d4b7d4a95a4',
    metadata: '{"name":"Xren","time":"02.04.2022 22:09:56 PM","lo….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '66553de15d5241a35418b6f1c716c2a7',
    metadata: '{"name":"Xren","time":"02.04.2022 22:09:56 PM","lo….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'c1948326ab354df11dd79c4a6f91cc7e',
    metadata: '{"name":"Hh","time":"02.04.2022 22:09:56 PM","loca….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '701e5e7bc6942867a2c2fd52544e9e43',
    metadata: '{"name":"Bratandroink","time":"02.04.2022 22:09:56….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'imagehashik3',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: '9e3f28da39db9fd9dd68def7e06f3219',
    metadata: '{"name":"Bratandroink","time":"02.04.2022 22:09:56….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '9cd7f2a25426bb84f850d9083a97fb75',
    metadata: '{"name":"Bratandroink","time":"02.04.2022 22:09:56….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'imagehashik3',
    metadata: '{"name":"Alex","time":"4/12/2022 10:22:04 PM","location":"unknown","uploadThrough":"server"}',
  },
  {
    media_hash: 'd7740987ffe84012fbab589159a70187',
    metadata: '{"name":"Bratandroink","time":"02.04.2022 22:09:56….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '0b4dce99df518ec49afaf617afcc1fcc',
    metadata: '{"name":"Bratandroink","time":"02.04.2022 22:09:56….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '4c62014dcba2be5f117d56adfc34d157',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'e4ded8d5d6d37643f38fc42eadce5e54',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '7890a7f39b1c989e60a2e63e787fd4d9',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '6079a6388cd8d2452fa05c15819e09ba',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'd67d9a4e3c7139744b80204d53b75cea',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'fdf328b427f6235c9c75ce60cfcc3a62',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'ca0ee2b0f68f2c3af03a974f4b416f06',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '767a0663f565c02b2518ddee9fe616cd',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'e0dc1c5eea09f141ec51294b3840b25e',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '4484ade3bfb15e83b61a0dd5962e1ec4',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: 'f6a36406e9c5dbfe7f1d2c05615bd9a8',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
  {
    media_hash: '23c6dc29dfac19312ef1f88d0f142356',
    metadata: '{"name":"Brata","time":"02.04.2022 22:09:56 PM","l….097867565:2.45769o008","uploadThrough":"server"}',
  },
];

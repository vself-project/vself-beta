import type { NextPage } from 'next';
import AppLayout from '../../components/appLayout';
import WebImageUploadForm from '../../features/upload-evidence';

const FormPage: NextPage = () => {
  return (
    <AppLayout>
      <WebImageUploadForm />
    </AppLayout>
  );
};

export default FormPage;

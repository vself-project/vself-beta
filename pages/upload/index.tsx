import type { NextPage } from 'next';
import AppLayout from '../../components/appLayout';
import WebImageUploadForm from '../../features/webImagesUploadForm';

const FormPage: NextPage = () => {
  return (
    <AppLayout>
      <WebImageUploadForm />
    </AppLayout>
  );
};

export default FormPage;

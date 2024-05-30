import { SystemText } from '../../shared-components/system-fonts/text';

import { useTranslation } from 'react-i18next';
function Home() {
  // Example for translation
  const { t } = useTranslation();

  return <div style={{
    // background: 'black'
  }}>
    <SystemText variant="h3">{t('example_header')}</SystemText>
  </div>;
}

export default Home;

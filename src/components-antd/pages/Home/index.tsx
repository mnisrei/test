import { SystemText } from '../../shared-components/system-fonts/text';
import { useTranslation } from 'react-i18next';
function Home() {
  // Example for translation
  const { t } = useTranslation();

  return <SystemText variant="h3">{t('example_header')}</SystemText>;
}

export default Home;

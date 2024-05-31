
import useNavigateToTop from '@hooks/useNavigateToTop';
import { SystemText } from './system-fonts/text';

interface ErrorBoundaryProps {
  // You can define any additional props here if needed
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = () => {
  // const error: unknown | undefined = useRouteError();
  const { goto } = useNavigateToTop();
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <SystemText>Something went wrong</SystemText>
      <button onClick={() => goto('/')}> Go back to home</button>
    </section>
  );
};

export default ErrorBoundary;

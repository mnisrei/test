import { Spin } from 'antd'
function CircularCustomLoader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Spin size="large" />
    </div>
  );
}

export default CircularCustomLoader;

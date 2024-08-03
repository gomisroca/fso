import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification === '') {
    return null;
  }
  return <div className="fixed bottom-0 w-full bg-neutral-600 p-4 font-semibold text-neutral-100">{notification}</div>;
};

export default Notification;

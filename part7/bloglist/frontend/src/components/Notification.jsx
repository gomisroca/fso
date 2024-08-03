import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  if (notification === '') {
    return null;
  }
  return <div className="w-full fixed bottom-0 p-4 bg-neutral-600 text-neutral-100 font-semibold">{notification}</div>;
};

export default Notification;

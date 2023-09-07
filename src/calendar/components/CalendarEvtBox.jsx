export const CalendarEvtBox = ({ event }) => {
  const { title, user } = event;
  return (
    <div>
      <h5>{title}</h5>
      <span>{user.name}</span>
    </div>
  );
};

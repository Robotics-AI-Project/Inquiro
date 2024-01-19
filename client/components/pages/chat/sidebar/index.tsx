import ChatList from "./chat-list";
import NewChat from "./new-chat";
const ChatSidebar = () => {
  return (
    <div className="flex flex-col space-y-[22px]">
      <NewChat />
      <ChatList />
    </div>
  );
};

export default ChatSidebar;

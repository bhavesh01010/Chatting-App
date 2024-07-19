import React, { useEffect } from "react";
import Avatar from "../../assets/avatar.svg";
import Call from "../../assets/call.svg";
import Input from "../../components/Input/index";
import Send from "../../assets/send.svg";
import Plus from "../../assets/plus.svg";
import { useState } from "react";
import { io } from 'socket.io-client'

const Dashboard = () => {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversation, setConversation] = useState([]);
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [use, setUse] = useState([]);
  const [socket,setSocket] = useState(null)

  useEffect(()=>{
    setSocket(io('http://localhost:8000'))
  },[])

  useEffect(()=>{
    socket?.emit('addUser', user?.id)
    socket?.on('getUsers', users =>{
      console.log('Active users: ', users)
    })
    socket?.on('getMessage', data => {
      setMessages(pre=> ({
        ...pre,
        message: [...pre.message, {user: data.user, message: data.message}]
      }))
    })
  },[socket])
  
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const res = await fetch(
        `http://localhost:8181/api/conversation/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversation(resData);
    };
    fetchConversations();
  }, []);
  
  useEffect(() => {
    const fetchUsers = async ()=>{
      const res = await fetch(`http://localhost:8181/api/users/${user?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resData = await res.json()
      setUsers(resData)
    }
    fetchUsers()
  }, [])
  
  const fetchMessages = async (conversationId, user) => {
    // console.log(user)
    const res = await fetch(
      `http://localhost:8181/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${messages?.receiver?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    // console.log(resData)
    setMessages({ message: resData, receiver: user, conversationId });
  };

  const sendMessage = async () => {
    setMessage("");
    socket?.emit('sendMessage', {
      conversationId: messages?.conversationId,
      senderId: user?.id,
      message,
      receiverId: messages?.receiver?.receiverId
    })
    // console.log(messages)
    const res = await fetch(`http://localhost:8181/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      }),
    });
    const resData = await res.json();
    // console.log("resData : ", resData);
  };

  // const content = () => {
  //   return <div className="w-[65%] bg-light h-[60px] my-5 rounded-full flex items-center px-11">
  //   <div className="cursor-pointer">
  //     <img src={Avatar} width={45} height={45} />
  //   </div>
  //   <div className="ml-5 mr-auto">
  //     <h3 className="text-lg font-normal">{messages?.receiver?.fullName}</h3>
  //     <p className="text-sm font-light text-gray-600">{messages?.receiver?.email}</p>
  //   </div>
  //   <div className="cursor-pointer">
  //     <img src={Call} width={25} height={25} />
  //   </div>
  //  </div>
  // }

  return (
    <div className="w-screen flex">
      <div className="w-[22.5%] h-screen bg-light">
        <div className="flex items-center my-6 mx-10">
          <div>
            <img src={Avatar} width={60} height={60} />
          </div>
          <div className="ml-7">
            <h3 className="text-2xl">{user.fullName}</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-5 ">
          <div className="text-primary">Messages</div>
          <div>
            {conversation.length > 0 ? (
              conversation.map(({ conversationId, user }) => {
                return (
                  <div className="flex items-center py-5 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div>
                        <img src={Avatar} width={45} height={45} />
                      </div>
                      <div className="ml-7">
                        <h3 className="text-lg font-normal">{user.fullName}</h3>
                        <p className="text-sm font-light text-gray-600">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-normal mt-7">
                No Conversation
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[55%] h-screen bg-white flex flex-col items-center">
        {messages?.receiver?.fullName && (
          <div className="w-[65%] bg-light h-[60px] my-5 rounded-full flex items-center px-11">
            <div className="cursor-pointer">
              <img src={Avatar} width={45} height={45} />
            </div>
            <div className="ml-5 mr-auto">
              <h3 className="text-lg font-normal">
                {messages?.receiver?.fullName}
              </h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            <div className="cursor-pointer">
              <img src={Call} width={25} height={25} />
            </div>
          </div>
        )}

        <div className="h-[80%] w-full overflow-y-scroll shadow-sm ">
          <div className="px-6 pb-6">
            {messages?.message?.length > 0 ? (
              messages?.message.map(({ message, user: { id } = {} }) => {
                return (
                  <div
                    className={`max-w-[40%] rounded-b-xl p-2.5 mb-5 ${
                      id === user.id
                        ? "bg-primary rounded-tl-xl text-white ml-auto "
                        : "bg-light rounded-tr-xl"
                    } `}
                  >
                    {message}
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-normal mt-7">
                No Messages
              </div>
            )}
          </div>
        </div>
        {messages?.receiver?.fullName && (
          <div className="p-4 w-full flex items-center">
            <Input
              placeholder="type a message"
              className="w-[75%]"
              inputclassName="p-2 px-5 border-1 shadow-md rounded-2xl bg-light focus:ring-0 focus:border-0 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              className={`p-2 ml-4 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <img src={Send} width={25} height={25} />
            </div>
            <div className="p-2 ml-4 cursor-pointer bg-light rounded-full ">
              <img src={Plus} width={25} height={25} />
            </div>
          </div>
        )}
      </div>
      <div className="w-[22.5%] h-screen bg-light px-8 py-7">
        <div className="text-primary text-xl">People</div>
        <div>
            {users?.length > 0 ? 
              users.map(({ userId, user }) => {
                return (
                  <div className="flex items-center py-5 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages('new', user)}
                    >
                      <div>
                        <img src={Avatar} width={45} height={45} />
                      </div>
                      <div className="ml-7">
                        <h3 className="text-lg font-normal">{user?.fullName}</h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            ) : 
            (
              <div className="text-center text-lg font-normal mt-7">
                No Conversation
              </div>
            )
            }
          </div>
      </div>
    </div>
  );
};

export default Dashboard;

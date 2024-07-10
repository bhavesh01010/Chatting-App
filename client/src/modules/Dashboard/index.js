import React, { useEffect } from "react";
import Avatar from "../../assets/avatar.svg";
import Call from "../../assets/call.svg";
import Input from "../../components/Input/index";
import Send from "../../assets/send.svg";
import Plus from "../../assets/plus.svg";
import { useState } from "react";

const Dashboard = () => {
  const contacts = [
    {
      name: "John",
      status: "Available",
      img: Avatar,
    },
    {
      name: "John",
      status: "Available",
      img: Avatar,
    },
    {
      name: "John",
      status: "Available",
      img: Avatar,
    },
    {
      name: "John",
      status: "Available",
      img: Avatar,
    },
    {
      name: "John",
      status: "Available",
      img: Avatar,
    },
  ];

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user:detail"));
    const fetchConversations = async () => {
      const res = await fetch(
        // console.log(loggedInUser.id)
        `http://localhost:8181/api/conversation/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json()
      setConversation(resData)
    };
    fetchConversations()
  }, []);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user:detail"))
  );
  const [conversation, setConversation] = useState([]);

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
            {conversation.map(({ conversationId, user }) => {
              return (
                <div className="flex items-center py-5 border-b border-b-gray-300">
                  <div className="cursor-pointer flex items-center">
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
            })}
          </div>
        </div>
      </div>
      <div className="w-[55%] h-screen bg-white flex flex-col items-center">
        <div className="w-[65%] bg-light h-[60px] my-5 rounded-full flex items-center px-11">
          <div className="cursor-pointer">
            <img src={Avatar} width={45} height={45} />
          </div>
          <div className="ml-5 mr-auto">
            <h3 className="text-lg font-normal">John</h3>
            <p className="text-sm font-light text-gray-600">online</p>
          </div>
          <div className="cursor-pointer">
            <img src={Call} width={25} height={25} />
          </div>
        </div>
        <div className="h-[80%] w-full overflow-y-scroll shadow-sm ">
          <div className="px-6 pb-6">
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-light rounded-b-xl rounded-tr-xl p-2.5 mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
            <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">
              lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb
            </div>
          </div>
        </div>
        <div className="p-4 w-full flex items-center">
          <Input
            placeholder="type a message"
            className="w-[75%]"
            inputclassName="p-2 px-5 border-1 shadow-md rounded-3xl bg-light focus:ring-0 focus:border-0 outline-none"
          />
          <div className="p-2 ml-4 cursor-pointer bg-light rounded-full ">
            <img src={Send} width={25} height={25} />
          </div>
          <div className="p-2 ml-4 cursor-pointer bg-light rounded-full ">
            <img src={Plus} width={25} height={25} />
          </div>
        </div>
      </div>
      <div className="w-[22.5%] h-screen bg-light "></div>
    </div>
  );
};

export default Dashboard;

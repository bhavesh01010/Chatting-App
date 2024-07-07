import React from "react";
import Avatar from "../../assets/avatar.svg";
import Call from "../../assets/call.svg";
import Input from "../../components/Input/index"
import Send from "../../assets/send.svg"
import Plus from "../../assets/plus.svg"

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
  return (
    <div className="w-screen flex">
      <div className="w-[22.5%] h-screen bg-secondary">
        <div className="flex items-center my-6 mx-14">
          <div>
            <img src={Avatar} width={60} height={60} />
          </div>
          <div className="ml-7">
            <h3 className="text-2xl">Tutorials Dev</h3>
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-5 ">
          <div className="text-primary">Messages</div>
          <div>
            {contacts.map(({ name, status, img }) => {
              return (
                <div className="flex items-center py-5 border-b border-b-gray-300">
                  <div className="cursor-pointer flex items-center">
                    <div>
                      <img src={img} width={45} height={45} />
                    </div>
                    <div className="ml-7">
                      <h3 className="text-lg font-normal">{name}</h3>
                      <p className="text-sm font-light text-gray-600">
                        {status}
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
        <div className="w-[65%] bg-secondary h-[60px] my-5 rounded-full flex items-center px-11">
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
            <div className="px-6 pb-6" >
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-2.5 mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
                <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-2.5 text-white mb-5">lorem1 ipsum lijebrg ernub bew weiuhf wen ausd we ujbfew dfsf unbb</div>
            </div>
        </div>
        <div className="p-4 w-full flex items-center" >
            <Input placeholder="type a message" className="w-[75%]" inputclassName="p-2 px-5 border-1 shadow-md rounded-3xl bg-light focus:ring-0 focus:border-0 outline-none"/>
            <div className="p-2 ml-4 cursor-pointer bg-light rounded-full " >
                <img src={Send} width={25} height={25} />
            </div>
            <div className="p-2 ml-4 cursor-pointer bg-light rounded-full " >
                <img src={Plus} width={25} height={25} />
            </div>
        </div>
      </div>
      <div className="w-[22.5%] h-screen bg-light "></div>
    </div>
  );
};

export default Dashboard;

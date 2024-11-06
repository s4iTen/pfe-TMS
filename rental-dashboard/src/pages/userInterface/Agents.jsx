import React from "react";
import { useSelector } from "react-redux";
import agent from "../../assets/agent.jpg";
import female from "../../assets/female.jpg";

const agents = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior Real Estate Agent",
    image: agent,
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Luxury Property Specialist",
    image: agent,
    phone: "+1 (555) 987-6543",
    email: "jane.smith@example.com",
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Commercial Real Estate Agent",
    image: agent,
    phone: "+1 (555) 765-4321",
    email: "michael.brown@example.com",
  },
  {
    id: 4,
    name: "Emily Johnson",
    title: "Residential Property Specialist",
    image: female,
    phone: "+1 (555) 234-5678",
    email: "emily.johnson@example.com",
  },
  {
    id: 5,
    name: "Robert Davis",
    title: "Investment Property Expert",
    image: agent,
    phone: "+1 (555) 345-6789",
    email: "robert.davis@example.com",
  },
  {
    id: 6,
    name: "Sophia Martinez",
    title: "Vacation Rental Specialist",
    image: female,
    phone: "+1 (555) 456-7890",
    email: "sophia.martinez@example.com",
  },
];

const Agent = ({ agent }) => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <div
      key={agent.id}
      className={`rounded-lg shadow-lg p-6 text-center ${
        darkMode === "dark" ? "bg-[#333] text-white" : "bg-white text-gray-800"
      }`}
    >
      <img
        className="w-32 h-32 object-contain rounded-full mx-auto mb-4"
        src={agent.image}
        alt={agent.name}
      />
      <h3
        className={`text-xl font-bold ${
          darkMode === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        {agent.name}
      </h3>
      <p
        className={`mb-4 ${
          darkMode === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {agent.title}
      </p>
      <div className={darkMode === "dark" ? "text-gray-400" : "text-gray-500"}>
        <p>
          <strong>Phone:</strong> {agent.phone}
        </p>
        <p>
          <strong>Email:</strong> {agent.email}
        </p>
      </div>
      <button
        className={`mt-4 px-4 py-2 rounded-lg transition duration-300 ${
          darkMode === "dark"
            ? "bg-blue-400 hover:bg-blue-500 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Contact Agent
      </button>
    </div>
  );
};

const Agents = () => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <section
      className={`py-12 ${darkMode === "dark" ? "bg-[#444]" : "bg-[#F2F2F2]"}`}
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Meet Our Agents
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <Agent agent={agent} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents;

import React, { useState, useEffect } from "react";
import { AcademicRecord, Organization, Records } from "../types";
import axios from "axios";

const RecordsSection: React.FC = () => {
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const backendPort = process.env.REACT_APP_BACKEND_PORT;
      const serverIP = process.env.REACT_APP_SERVER_IP;

      try {
        const response = await axios.get<Records>(
          `http://${serverIP}:${backendPort}/records`
        );
        setAcademicRecords(response.data.academic);
        setOrganizations(response.data.organizations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching experience:", error);
        setErrorMessage((error as Error).message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center pt-[15vh]">
        <div
          className="w-16 h-16 border-8 rounded-full animate-spin"
          style={{
            borderColor: "transparent",
            borderTopColor: "rgba(20, 184, 166, 0.7)",
            borderRightColor: "rgba(13, 148, 136, 0.9)",
            borderBottomColor: "rgba(19, 78, 74, 1)",
          }}
        ></div>
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <section className="flex flex-col lg:flex-row gap-8 px-4 py-8">
      <div className="lg:w-1/2">
        <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
          <span className="function-name">$</span>{" "}
          <span className="string">ls</span>{" "}
          <span className="keyword">-l</span>{" | "}
          <span className="function-name">grep</span>{" "}
          <span className="string">academics</span>
          <span className="cursor"></span>
        </h2>
        <ul className="space-y-4">
          {academicRecords.map((record, index) => (
            <li key={index} className="bg-zinc-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{record.institution}</h3>
              <p>
                {record.degree} in {record.field_of_study}
              </p>
              <p>
                {record.start_date} - {record.end_date}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:w-1/2">
        <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
          <span className="include">#include</span>{" "}
          <span className="string">"organizations.h"</span>
          <span className="cursor"></span>
        </h2>

        <ul className="space-y-4">
          {organizations.map((org, index) => (
            <li key={index} className="bg-zinc-100 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{org.name}</h3>
              <p>
                {org.role} ({org.duration})
              </p>
              <p>{org.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default RecordsSection;

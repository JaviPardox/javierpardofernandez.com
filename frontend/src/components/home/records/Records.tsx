import { useState, useEffect } from "react";
import { Academic, Organization, Records } from "../../../types";
import axios from "axios";


const RecordsSection = () => {
  const [academicRecords, setAcademicRecords] = useState<Academic[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [displayedText, setDisplayedText] = useState<Record<string, string>[]>([]);

  const academicTitle: Record<string, string> = {
    " $ ": "function-name",
    "ls ": "string",
    "-l ": "keyword",
    "| ": "",
    "grep ": "function-name",
    "academics": "string",
  };

  function splitKeysToChars(inputDict: Record<string, string>): Record<string, string>[] {
    const arrayOfDictionaries: Record<string, string>[] = []
  
    Object.entries(inputDict).forEach(([key, value]) => {
      for (const char of key) {
        const tmpDict: Record<string, string> = {};
        tmpDict[char] = value;
        arrayOfDictionaries.push(tmpDict);
      }
    });
    console.log(arrayOfDictionaries);
    return arrayOfDictionaries;
  }
    
  useEffect(() => {
    let currentIndex = 0;
    const splitAcademicTitle = splitKeysToChars(academicTitle);

    const type = () => {
      if (currentIndex < splitAcademicTitle.length - 1) {
        setDisplayedText((prev) => {
          // Leaving this for debugging due to the state skipping the first item of the array
          // Could be due to how React renders the page
          const updated = [...(prev || []), splitAcademicTitle[currentIndex]]
          return updated
        });
        currentIndex++;
      } else {
        clearInterval(typingInterval); 
      }
    };
    
    const typingInterval = setInterval(type, 200);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      const backendPort = process.env.REACT_APP_BACKEND_PORT;
      const serverIP = process.env.REACT_APP_SERVER_IP;

      try {
        const response = await axios.get<Records>(
          `http://${serverIP}:${backendPort}/records`
        );
        setAcademicRecords(response.data.academics);
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
  if (error)
    return (
      <>
        <section className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
              <span className="function-name">$</span>{" "}
              <span className="string">ls</span>{" "}
              <span className="keyword">-l</span>
              {" | "}
              <span className="function-name">grep</span>{" "}
              <span className="string">academics</span>
              <span className="cursor"></span>
            </h2>
          </div>
          <div className="lg:w-1/2">
            <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
              <span className="include">#include</span>{" "}
              <span className="string">"organizations.h"</span>
              <span className="cursor"></span>
            </h2>
          </div>
        </section>
        <div className="text-red-500 text-center">{error}</div>
      </>
    );

  return (
    <section className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2">
        <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
        {displayedText.map((item, index) => (
        <span key={index}>
          {Object.entries(item).map(([key, value]) => (
                <span key={key} className={value}>
                  {key}
                </span>
              ))}
        </span>
      ))}
          <span className="cursor"></span>
        </h2>
        <div className="perspective-500 transform transition-all duration-300 lg:hover:scale-[1.02] active:scale-[0.98] lg:hover:shadow-2xl lg:hover:brightness-110 active:brightness-90 rounded-2xl border p-6 pl-3 md:pl-6 border-zinc-700/40 bg-zinc-800/80 lg:hover:bg-zinc-800/90 active:bg-zinc-800/70 shadow-xl active:shadow-none">
          <ul className="space-y-4">
            {academicRecords.map((record, index) => (
              <li
                key={index}
                className="flex gap-4 transition-transform duration-200 lg:hover:translate-x-1 active:translate-x-0.5"
              >
                <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                  <img
                    alt=""
                    loading="lazy"
                    width="32"
                    height="32"
                    decoding="async"
                    data-nimg="1"
                    className="h-7 w-7 rounded-full"
                    src={`/img/records/${record.logo_path}.png`}
                    style={{ color: "transparent" }}
                  />
                </div>
                <dl className="flex flex-auto flex-wrap gap-x-2">
                  <dd className="w-full flex-none text-sm font-medium text-zinc-100">
                    {record.field_of_study}
                    <span className="mx-1">|</span>
                    <span className="italic font-normal text-zinc-100/60">
                      {record.degree}
                    </span>
                  </dd>
                  <dd className="text-xs text-zinc-400">
                    {record.institution}
                  </dd>
                  <dd className="ml-auto text-xs text-zinc-500">
                    <time>{record.start_date}</time> <span>—</span>{" "}
                    <time>{record.end_date}</time>
                  </dd>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="lg:w-1/2">
        <h2 className="relative text-4xl mb-10 mt-7 text-zinc-100 tracking-tight leading-[3.5rem] code-themed break-words overflow-x-auto">
          <span className="include">#include</span>{" "}
          <span className="string">"organizations.h"</span>
          <span className="cursor"></span>
        </h2>
        <div className="perspective-500 transform transition-all duration-300 lg:hover:scale-[1.02] active:scale-[0.98] lg:hover:shadow-2xl lg:hover:brightness-110 active:brightness-90 rounded-2xl border p-6 pl-3 md:pl-6 border-zinc-700/40 bg-zinc-800/80 lg:hover:bg-zinc-800/90 active:bg-zinc-800/70 shadow-xl active:shadow-none">
          <ul className="space-y-4">
            {organizations.map((org, index) => (
              <li
                key={index}
                className="flex gap-4 transition-transform duration-200 lg:hover:translate-x-1 active:translate-x-0.5"
              >
                <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
                  <img
                    alt=""
                    loading="lazy"
                    width="32"
                    height="32"
                    decoding="async"
                    data-nimg="1"
                    className="h-7 w-7 rounded-full"
                    src={`/img/records/${org.logo_path}.png`}
                    style={{ color: "transparent" }}
                  />
                </div>
                <dl className="flex flex-auto flex-wrap gap-x-2">
                  <dd className="w-full flex-none text-sm font-medium text-zinc-100">
                    {org.name}
                    <span className="mx-1">|</span>
                    <span className="italic font-normal text-zinc-100/60">
                      {org.chapter}
                    </span>
                  </dd>
                  <dd className="text-xs text-zinc-400">{org.role}</dd>
                  <dd className="ml-auto text-xs text-zinc-500">
                    <time>{org.duration}</time>
                  </dd>
                  <dd className="w-full flex-none text-xs text-zinc-200">
                    {org.description}
                  </dd>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default RecordsSection;

"use client";
import React, { useEffect, useState } from "react";
import { database } from "@/firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import AddDebt from "@/components/AddDebt";
import { Actor } from "next/font/google";

const actor = Actor({ subsets: ["latin"], weight: "400" });

const hoverSounds = () => {
  const audioElement = new Audio("assets/hover.flac");
  audioElement.play();
};

const clickSounds = () => {
  const audioElement = new Audio("assets/click.mp3");
  audioElement.play();
};

export default function Debttracker() {
  const [val, setVal] = useState<
    Array<{
      id: any;
      pemilik?: any;
      penghutang?: any;
      uang?: any;
      deskripsi?: any;
    }>
  >([]);

  const value = collection(database, "daftar hutang");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });

  const handleDelete = async (id: any) => {
    clickSounds();
    const deleteVal = doc(database, "daftar hutang", id);
    await deleteDoc(deleteVal);
  };

  return (
    <div className="min-h-[100vh] w-[100vw]">
      <div className="min-h-[100vh]  px-12 py-12 flex flex-col gap-2 justify-center items-center">
        {val.length === 0 ? (
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-black dark:text-secondary text-center drop-shadow-md">
            <h1>Belum ada hutang disini. Ingin menambahkan?</h1>
            <AddDebt />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <div className="w-fit fixed drop-shadow-md z-10 bottom-8 md:top-8">
              <AddDebt />
            </div>
            <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 -translate-x-4 md:translate-x-0">
              {val.map((values) => (
                <div
                  key={values.id}
                  className="bg-[#d9d9d950] dark:bg-[#d9d9d910] backdrop-blur-sm flex flex-col justify-center items-center p-8 rounded-3xl relative floating flex-none z-0 drop-shadow-md"
                >
                  <h1 className={`text-black dark:text-white text-6xl`}>
                    {values.uang}
                  </h1>
                  <p
                    className={`text-black dark:text-white ${actor.className}`}
                  >
                    Penghutang: <b>{values.penghutang}</b>
                  </p>
                  <p
                    className={`text-black dark:text-white ${actor.className}`}
                  >
                    Pemilik: <b>{values.pemilik}</b>
                  </p>
                  <button
                    onClick={() => handleDelete(values.id)}
                    onMouseEnter={hoverSounds}
                    className="bg-red-400 rounded-lg p-1 absolute z-10 right-0 top-0 dark:text-white text-black"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30 56H18.6667C17.2 56 15.9449 55.4782 14.9013 54.4347C13.8578 53.3911 13.3351 52.1351 13.3333 50.6667V16H10.6667V10.6667H24V8H40V10.6667H53.3333V16H50.6667V27.4667C49.9111 27.2444 49.0338 27.0551 48.0347 26.8987C47.0355 26.7422 46.1351 26.6649 45.3333 26.6667V16H18.6667V50.6667H27.4667C27.7333 51.6 28.0889 52.5227 28.5333 53.4347C28.9778 54.3467 29.4667 55.2018 30 56ZM24 45.3333H26.6667C26.6667 42.5333 27.1111 40.2329 28 38.432L29.3333 35.7333V21.3333H24V45.3333ZM34.6667 30C35.4222 29.5111 36.2782 29.0222 37.2347 28.5333C38.1911 28.0444 39.1129 27.6889 40 27.4667V21.3333H34.6667V30ZM45.3333 58.6667C41.6444 58.6667 38.5004 57.3662 35.9013 54.7653C33.3022 52.1644 32.0018 49.0204 32 45.3333C32 41.6444 33.3004 38.5004 35.9013 35.9013C38.5022 33.3022 41.6462 32.0018 45.3333 32C49.0222 32 52.1671 33.3004 54.768 35.9013C57.3689 38.5022 58.6684 41.6462 58.6667 45.3333C58.6667 49.0222 57.3662 52.1671 54.7653 54.768C52.1644 57.3689 49.0204 58.6684 45.3333 58.6667ZM49.7333 51.6L51.6 49.7333L46.6667 44.8V37.3333H44V45.8667L49.7333 51.6Z"
                        fill="#1A1A1A"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

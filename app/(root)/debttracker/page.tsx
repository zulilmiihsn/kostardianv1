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
    <main className="min-h-[100vh] min-w-[100vw]">
      {val.length === 0 ? (
        <div className="h-[100vh] flex flex-col gap-4 justify-center items-center mt-20">
          <h1 className="text-center">
            Belum ada hutang disini. Tambahkan sekarang?
          </h1>
          <AddDebt title="Tambahkan Hutang" className="p-2 rounded-xl" />
        </div>
      ) : (
        <div className="h-fit relative mt-20">
          <AddDebt
            className="top-2 left-8 absolute h-12 w-12 p-2 rounded-full text-4xl font-bold"
            title={<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="currentColor" d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3zm-9 8V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"></path></svg>}
          />
          <div className="w-fit fixed drop-shadow-md z-10 bottom-8 md:top-8"></div>
          <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 place-content-center -translate-x-4">
            {val.map((values) => (
              <div
                key={values.id}
                className="bg-[#d9d9d950] dark:bg-[#d9d9d910] backdrop-blur-sm flex flex-col justify-center items-center p-8 rounded-3xl relative floating flex-none z-0 drop-shadow-xl"
              >
                <h1 className={`text-black dark:text-white text-6xl`}>
                  {values.uang}
                </h1>
                <p className={`text-black dark:text-white ${actor.className}`}>
                  Penghutang: <b>{values.penghutang}</b>
                </p>
                <p className={`text-black dark:text-white ${actor.className}`}>
                  Pemilik: <b>{values.pemilik}</b>
                </p>
                <button
                  onClick={() => handleDelete(values.id)}
                  onMouseEnter={hoverSounds}
                  className="bg-red-400 rounded-lg p-1 absolute z-10 -right-2 -top-2 dark:text-white text-black deleteButton"
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { database } from "@/firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import AddDebt from "@/components/AddDebt";
import { Actor } from "next/font/google";

const actor = Actor({subsets: ["latin"], weight: "400"})

const hoverSounds = () => {
  const audioElement = new Audio('assets/hover.flac');
  audioElement.play();
}

const clickSounds = () => {
  const audioElement = new Audio('assets/click.mp3');
  audioElement.play();
}

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
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-black dark:text-secondary text-center">
            <h1>Belum ada hutang disini. Ingin menambahkan?</h1>
            <AddDebt />
          </div>
        ) : (
          <div className="w-full h-full relative">
            <div className="w-fit fixed drop-shadow-md z-10 bottom-8 md:top-8">
            <AddDebt />
            </div>
            <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 place-content-center">
              {val.map((values) => (
                <div
                  key={values.id}
                  className="bg-[#d9d9d950] dark:bg-[#d9d9d910] backdrop-blur-sm flex flex-col justify-center items-center p-8 rounded-3xl relative floating flex-none z-0"
                >
                  <h1 className={`text-black dark:text-white text-6xl`}>{values.uang}</h1>
                  <p className={`text-black dark:text-white ${actor.className}`}>Penghutang: <b>{values.penghutang}</b></p>
                  <p className={`text-black dark:text-white ${actor.className}`}>Pemilik: <b>{values.pemilik}</b></p>
                  <button
                    onClick={() => handleDelete(values.id)}
                    onMouseEnter={hoverSounds}
                    className="bg-red-400 rounded-lg p-1 absolute z-10 right-0 top-0 dark:text-white text-black"
                  >
                    Delete
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

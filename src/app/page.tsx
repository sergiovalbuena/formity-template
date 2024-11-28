"use client";

import type { Value } from "expry";
import type { ReactElement } from "react";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Form from "@/form";
import Data from "@/data";

export default function Home() {
  const [result, setResult] = useState<Value | null>(null);

  function handleReturn(result: Value) {
    setResult(result);
  }

  let component: ReactElement;

  if (result) {
    component = (
      <motion.div
        key="data"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Data data={result} onStart={() => setResult(null)} />
      </motion.div>
    );
  } else {
    component = (
      <motion.div
        key="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Form onReturn={handleReturn} />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {component}
    </AnimatePresence>
  );
}

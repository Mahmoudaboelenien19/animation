// "use client";

// import { useRef, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// const opacityV = {
//   start: { opacity: 0 },
//   end: (i: number) => ({ opacity: 1, transition: { delay: 0.01 * i } }),
//   exit: (i: number) => ({ opacity: 0, transition: { delay: 0.01 * i } }),
// };

// export default function Home() {
//   const [isClicked, setIsClicked] = useState(false);
//   const toggle = () => setIsClicked(!isClicked);
//   const ref = useRef<HTMLDivElement | null>(null);
//   const shuffle = (a) => {
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//       j = Math.floor(Math.random() * (i + 1));
//       x = a[i];
//       a[i] = a[j];
//       a[j] = x;
//     }
//     return a;
//   };

//   const blocks = () => {
//     if (ref?.current) {
//       const { offsetWidth, offsetHeight } = ref.current;
//       const blockSize = offsetWidth * 0.05;
//       const nbOfBlocks = Math.ceil(offsetHeight / blockSize);
//       const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
//       return shuffledIndexes.map((randomIndex, index) => {
//         return (
//           <motion.div
//             key={index}
//             variants={opacityV}
//             initial="start"
//             animate={"end"}
//             exit="exit"
//             custom={randomIndex}
//           />
//         );
//       });
//     } else {
//       return <></>;
//     }
//   };

//   return (
//     <div className="flex h-screen w-screen">
//       <button
//         onClick={toggle}
//         className="fixed top-20 left-1/2  text-white bg-blue-500/50 p-4 -translate-x-1/2 rounded-lg"
//       >
//         Toggle
//       </button>
//       <AnimatePresence>
//         {isClicked && (
//           <div
//             ref={ref}
//             className="w-[200px] h-[200px] m-auto flex flex-wrap over-flow-"
//           >

//             {Array.of({ length: 20 }).map((_, i) => {
//               return (
//                 <span className="  bg-green-300 h-[5%] w-[5%] " key={i}>
//                   {blocks()}
//                 </span>
//               );
//             })}
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const opacityV = {
  start: { opacity: 0 },
  end: (i: number) => ({ opacity: 1, transition: { delay: 0.01 * i } }),
  exit: (i: number) => ({ opacity: 0, transition: { delay: 0.2 + 0.01 * i } }),
};

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);
  const toggle = () => setIsClicked(!isClicked);
  //this shuffle fn is for to return indexes of array not in order
  // in this video he said it's a famous algorithm
  //https://www.youtube.com/watch?v=IpDIAilIsrI&ab_channel=OlivierLarose
  const shuffle = (a: number[]) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };
  const n = 25;
  // const root = Math.ceil(Math.sqrt(n));
  // const widthOfBlocks = Math.ceil(100 / root);

  const shuffledIndexes = shuffle([...Array(n)].map((_, i) => i));

  return (
    <div className="flex h-screen w-screen">
      <button
        onClick={toggle}
        className="fixed top-20 left-1/2  text-white bg-blue-500/50 p-4 -translate-x-1/2 rounded-lg"
      >
        Toggle
      </button>
      <AnimatePresence>
        {isClicked && (
          <div className="relative   w-[500px] h-[400px] m-auto flex items-center justify-center rounded overflow-hidden  ">
            <div className="absolute -z-10 top-0 left-0 w-full h-full m-auto flex flex-wrap">
              {shuffledIndexes.map((randomIndex: number, i: number) => {
                return (
                  <motion.span
                    variants={opacityV}
                    initial="start"
                    animate={"end"}
                    exit="exit"
                    custom={randomIndex}
                    className={`bg-green-300 h-[20%] w-[20%]`}
                    key={i}
                  />
                );
              })}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1 } }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              className="m-auto text-gray-900"
            >
              hello there . !
            </motion.p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

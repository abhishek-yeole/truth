import { cn } from "./cn.js";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import ExpandIcon from "../../assets/ExpandIcon.jsx";
import toast from "react-hot-toast";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName
}) => {
  return (<>
    <FloatingDockDesktop items={items} className={desktopClassName} />
    <FloatingDockMobile items={items} className={mobileClassName} />
  </>);
};

const FloatingDockMobile = ({
  items,
  className
}) => {
  const [open, setOpen] = useState(false);
  return (
    (<div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link
                  to={item.href}
                  key={item.title}
                  className={`h-12 w-12 rounded-full ${ item.active ? item.bgColor : "bg-gray-100 dark:bg-neutral-800" } shadow-lg flex items-center justify-center transition-shadow`}
                  onClick={() => setOpen(!open)}
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={`h-12 w-12 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center ${open && 'rotate-180'} transition-all`}>
          <ExpandIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      </button>
    </div>)
  );
};

const FloatingDockDesktop = ({
  items,
  className
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    (<motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-gray-100 dark:bg-neutral-800 px-4 pb-3",
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>)
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  target,
  bgColor,
  active,
}) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = "https://truth-gnec.vercel.app";
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            toast.success("Copied to Clipboard");
        }).catch(err => {
            console.error("Clipboard write failed: ", err);
            toast.error("Failed to copy!");
        });
    } else {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            toast.success("Copied to Clipboard");
        } catch (err) {
            console.error("Fallback copy failed: ", err);
            toast.error("Failed to copy!");
        } finally {
            document.body.removeChild(textarea);
        }
    }
  };


  if (href === "copy") {
    return (
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`cursor-pointer aspect-square rounded-full ${ active ? bgColor : "bg-gray-100 dark:bg-neutral-800" } shadow-lg flex items-center justify-center relative transition-shadow`}
        onClick={() => copyToClipboard() }>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs z-20">
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    )
  } else return (
    (<Link to={href} target={target !== null && target}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`aspect-square rounded-full ${bgColor && active ? bgColor : "bg-gray-100 dark:bg-neutral-900" } shadow-lg flex items-center justify-center relative transition-shadow`}>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs z-20">
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </Link>)
  );
}
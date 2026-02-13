import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface DraggableCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    index?: number;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({ children, className, onClick, index = 0, ...props }) => {
    const isLink = className?.includes("link-card");

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 0.68, 0, 1.2],
                delay: index * 0.05
            }}
            drag
            dragSnapToOrigin={true}
            dragElastic={0.2}
            whileHover={{ scale: 1.02, y: isLink ? -5 : -2, zIndex: 10 }}
            whileDrag={{ scale: 1.05, zIndex: 100, cursor: "grabbing" }}
            className={className}
            onTap={onClick} // Use onTap instead of onClick to distinguish drag from click
            {...props}
        >
            {children}
        </motion.div>
    );
};

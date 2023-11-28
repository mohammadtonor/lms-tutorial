'use client' ;

import ReactConfetti from "react-confetti";

import { useConfettistore } from "@/hooks/use-confetti-store"; 

export const ConfettiProvider = () => {
    const confettistore = useConfettistore();

    if (!confettistore.isOpen) {
        return null;
    }

    return (
        <ReactConfetti
            className="pointer-events-none z-[100]"
            numberOfPieces={500}
            recycle={false}
            onConfettiComplete={() => {
                confettistore.onClose();
            }}
        />
    )
}
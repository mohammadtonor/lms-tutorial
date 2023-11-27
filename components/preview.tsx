import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bUbble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReatQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );

  return <ReatQuill theme="bubble" value={value} readOnly />;
};
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.snow.css"

interface EditorProps {
  onChange: (value: any) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const ReatQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }), []);
    
    return (
        <div className="bg-white">
            <ReatQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

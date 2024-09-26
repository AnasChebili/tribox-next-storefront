import { ChangeEvent, ChangeEventHandler } from "react";

export default function ImageUpload({
  onChange,
  id,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
}) {
  return (
    <div>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-0 cursor-pointer "
      />
    </div>
  );
}

import { ChangeEvent, ChangeEventHandler } from "react";

export default function ImageUpload({
  onChange,
  id,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Image</label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-0 cursor-pointer"
      />
    </div>
  );
}

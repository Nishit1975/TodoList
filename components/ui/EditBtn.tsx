"use client";

export default function EditBtn(props: {
  id: number;
  editfn: (id: number) => void;
}) {
  return (
    <button
      onClick={() => props.editfn(props.id)}
      style={{
        padding: "6px 12px",
        backgroundColor: "#00ff44ff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Edit
    </button>
  );
}

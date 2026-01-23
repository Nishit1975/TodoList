"use client";

export default function DeleteBtn(props: {
  id: number;
  deleteFn: (id: number) => Promise<void>;
}) {
  return (
    <>
      <button
        onClick={async () => {
          if (confirm("Are you sure you want to delete?")) {
            await props.deleteFn(props.id);
          }
        }}
        style={{
          padding: "6px 12px",
          backgroundColor: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </>
  )
};
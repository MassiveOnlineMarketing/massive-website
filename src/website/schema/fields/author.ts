import { Writer } from "@/payload/payload-types";

export default function authorField(writers: (Writer | string)[]) {
  return writers.map((author: Writer | string) => {
    if (typeof author === "string") {
      return {
        "@type": "Person",
        name: author,
      };
    } else {
      return {
        "@type": "Person",
        name: author.fullName,
      };
    }
  });
}

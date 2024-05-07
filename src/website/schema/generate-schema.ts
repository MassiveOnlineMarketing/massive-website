import corporationSchema from "./types/Corporation";
import webSiteSchema from "./types/WebSite";
import { BlogPost } from "@/payload/payload-types";
import BlogWebPage from "./types/BlogWebPage";
import BlogCollectionPage from "./types/BlogCollectionPage";
import ServiceSchema, { Service } from "./types/Service";

export default function generateSchema(
  schemaType:
    | "BlogWebPage"
    | "BlogCollectionPage"
    | "DefaultSchema"
    | "Service",
  data?: BlogPost | BlogPost[] | Service,
) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [],
  };

  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [corporationSchema(), webSiteSchema()],
  };

  if (schemaType === "DefaultSchema") {
    return defaultSchema;
  } else if (schemaType === "BlogCollectionPage") {
    // @ts-ignore
    schema["@graph"].push(BlogCollectionPage(data));

    return schema;
  } else if (schemaType === "BlogWebPage") {
    // @ts-ignore
    schema["@graph"].push(BlogWebPage(data));

    return schema;
  } else if (schemaType === "Service") {
    // @ts-ignore
    schema["@graph"].push(ServiceSchema(data));

    return schema;
  }
}

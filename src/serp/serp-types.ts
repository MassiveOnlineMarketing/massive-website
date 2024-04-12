import { Result, Tag } from "@prisma/client";

export type KeywordResultWithTagProp = Result & { tags?: Tag[] };
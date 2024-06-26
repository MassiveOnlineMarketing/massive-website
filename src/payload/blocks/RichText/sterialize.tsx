import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import Image from "next/image";
import { Heading, Paragraph } from "@/components/ui/typography/typography";
import { PAYLOAD_BACKEND_URL } from "../../../../routes";
import { ExternalAnchor, InternalAnchor } from "@/components/ui/link";

// eslint-disable-next-line no-use-before-define
type Children = Leaf[];

type Leaf = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Children;
  url?: string;
  [key: string]: unknown;
  fields?: {
    linkType: string;
  };
};

const serialize = (children?: Children): React.ReactNode[] =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = (
          <strong className="text-gray-700" key={i}>
            {text}
          </strong>
        );
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={i}>
            {text}
          </span>
        );
      }

      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: "line-through" }} key={i}>
            {text}
          </span>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{serialize(node?.children)}</h1>;
      case "h2":
        return (
          <Heading level="h2" size="4xl" className="mt-[72px]" key={i}>
            {serialize(node?.children)}
          </Heading>
        );
      case "h3":
        return (
          <Heading level="h3" size="3xl" className="mt-[72px]" key={i}>
            {serialize(node?.children)}
          </Heading>
        );
      case "h4":
        return (
          <Heading level="h4" size="2xl" className="mt-[72px] -mb-3" key={i}>
            {serialize(node?.children)}
          </Heading>
        );
      case "h5":
        return (
          <Heading level="h5" size="xl" className="mt-[72px]" key={i}>
            {serialize(node?.children)}
          </Heading>
        );
      case "h6":
        return (
          <Heading level="h6" size="lg" className="mt-[72px]" key={i}>
            {serialize(node?.children)}
          </Heading>
        );
      case "quote":
        return <blockquote key={i}>{serialize(node?.children)}</blockquote>;
      case "ul":
        return (
          <ul
            className="mt-6 list-disc ml-6 text-gray-600 leading-7 text-lg"
            key={i}
          >
            {serialize(node?.children)}
          </ul>
        );
      case "ol":
        return (
          <ol
            className="mt-6 list-decimal ml-6 text-gray-600 leading-7 text-lg"
            key={i}
          >
            {serialize(node.children)}
          </ol>
        );
      case "li":
        return <li key={i}>{serialize(node.children)}</li>;
      case "upload":
        return (
          <Image
            className="mt-[72px]"
            key={i}
            src={`${PAYLOAD_BACKEND_URL}${node.value?.url}`}
            // @ts-ignore
            alt={node.value?.alt}
            // @ts-ignore
            width={node.value?.width}
            // @ts-ignore
            height={node.value?.height}
          />
        );
      case "link":
        if (node.fields?.linkType === "Intern") {
          console.log("node", node);
          return (
            <InternalAnchor
              key={i}
              variant="text"
              href={`${node.url}` || ""}
              className=" underline text-wrap"
            >
              {serialize(node?.children)}
            </InternalAnchor>
          );
        } else {
          return (
            <ExternalAnchor
              key={i}
              variant="text"
              href={`${node.url}` || ""}
              className="underline text-wrap"
            >
              {serialize(node?.children)}
            </ExternalAnchor>
          );
        }

      // case 'link':
      //   return (
      //     <CMSLink
      //       key={i}
      //       type={node.linkType === 'internal' ? 'reference' : 'custom'}
      //       url={node.url}
      //       reference={node.doc as any}
      //       newTab={Boolean(node?.newTab)}
      //     >
      //       {serialize(node?.children)}
      //     </CMSLink>
      //   )

      // case 'label':
      //   return <Label key={i}>{serialize(node?.children)}</Label>

      // case 'large-body': {
      //   return <LargeBody key={i}>{serialize(node?.children)}</LargeBody>
      // }

      default:
        return (
          <Paragraph
            size="lg"
            className="mt-6 leading-7 text-gray-600 "
            key={i}
          >
            {serialize(node?.children)}
          </Paragraph>
        );
    }
  }) || [];

export default serialize;

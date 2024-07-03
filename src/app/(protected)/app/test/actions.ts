"use server";

import { db } from "@/lib/db";
import * as dns from "dns";

// ! Test functions

const verifyDomain = async ({ domain }: { domain: string }) => {
  try {
    // Resolve domain to IP address
    const ip = await resolveDomain({ domain });

    // Send HTTP request to domain's homepage
    const response = await fetch(domain);

    if (response.ok) {
      return { exists: true, ip };
    } else {
      return { exists: false, ip };
    }
  } catch (error) {
    return { exists: false, ip: null };
  }
};

async function resolveDomain({ domain }: { domain: string }) {
  return new Promise((resolve, reject) => {
    dns.resolve(domain, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(addresses[0]);
      }
    });
  });
}

async function testUrl({ url }: { url: string }) {
  try {
    const response = await fetch(url);

    // Get the final URL after redirection
    const finalUrl = response.url;

    return { exists: true, finalUrl };
  } catch (error) {
    console.error("Error fetching URL:", url);
    return { exists: false, finalUrl: null };
  }
}


export const getData = async () => {
  const res = await db.googleSearchProject.findUnique({
    where : {
      id : 'cly4wrekt000f11w3qwu1t92n'
    },
    include : {
      keyword: {
        include: {
          tags: true,
          keywordMetrics: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
          Result: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          }
        }
      }
    }
  })

  return res
}



export { verifyDomain, testUrl,  };

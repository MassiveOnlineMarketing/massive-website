"use client";

import React, { useRef, useState, useEffect } from "react";

const PageContainer = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { rootMargin: "-300px" },
      );

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (ref.current) {
      if (isIntersecting) {
        ref.current.querySelectorAll("section").forEach((el) => {
          el.classList.add("slide-in");
        });
      } else {
        ref.current.querySelectorAll("section").forEach((el) => {
          el.classList.remove("slide-in");
        });
      }
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} className="main">
      <section>
        <h2>Buy my product</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
          voluptatum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Earum, delectus?
        </p>
      </section>

      <section>
        <h2>Buy my product</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
          voluptatum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Earum, delectus?
        </p>
      </section>
      <section>
        <h2>Buy my product</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
          voluptatum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Earum, delectus?
        </p>
      </section>
      <section>
        <h2>Buy my product</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
          voluptatum. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Earum, delectus?
        </p>
      </section>
    </div>
  );
};

export default PageContainer;

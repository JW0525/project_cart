import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {

    const timer = setTimeout(() => {
      router.push('/products').then();
    }, 1000);

    return () => clearTimeout(timer);
  },[]);

  return (
    <div>
      index
    </div>
  );
}


import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingBar from "@/components/common/LoadingBar";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/products').then();
    }, 500);

    return () => clearTimeout(timer);
  },[]);

  return (
    <div>
      <LoadingBar
       left={0}
      />
    </div>
  );
}

3
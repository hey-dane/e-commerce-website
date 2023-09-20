import React from "react";
import BottomNav from "../nav/BottomNav";
import TopNav from "../nav/TopNav";

export default function Navbar() {
  return (
    <>
      <header>
        <TopNav />
        <BottomNav />
      </header>
    </>
  );
}

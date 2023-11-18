import React from "react";
import ResponsiveAppBar from "./Appbar";
import "./Layout.css";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#F8F8F8" }}>
      <header>
        <ResponsiveAppBar />
      </header>
      <main className="LayoutBody">{children}</main>
    </div>
  );
};

export default Layout;

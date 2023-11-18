import React from "react";
import ResponsiveAppBar from "./Appbar";
import "./Layout.css";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div>
      <header>
        <ResponsiveAppBar />
      </header>
      <main className="LayoutBody">{children}</main>
    </div>
  );
};

export default Layout;

import React from "react";
import ServerView from "./views/server/server-view";
import ProjectView from "./views/project/project-view";
import ChatView from "./views/chat/chat-view";
import StyleCSS from "./stylesheet.module.scss";

function DashboardPage() {
  return (
    <main className={StyleCSS.wrapper}>
      {/* Server Navbar */}
      <section className={StyleCSS.sidebar}>
        <ServerView />
      </section>

      {/* Chat Navbar */}
      <section className={StyleCSS.content}>
        <ChatView />
      </section>

      {/* Project Navbar */}
      <section className={StyleCSS.sidebar}>
        <ProjectView />
      </section>
    </main>
  );
}

export default DashboardPage;

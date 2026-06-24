import React from "react";
import {
  SiC,
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import {
  Brain,
  Clock,
  Code2,
  Compass,
  Lightbulb,
  MessageSquare,
  Users
} from "lucide-react";

const LocalIcon = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt} 
    style={{ width: "100%", height: "100%", objectFit: "contain" }} 
  />
);

export const iconMap = { 
  html: () => <LocalIcon src="/assets/HTML5.svg" alt="HTML5" />, 
  css: () => <LocalIcon src="/assets/CSS3.svg" alt="CSS3" />, 
  javascript: () => <LocalIcon src="/assets/JavaScript.svg" alt="JavaScript" />, 
  git: () => <LocalIcon src="/assets/git.svg" alt="Git" />, 
  github: () => <LocalIcon src="/assets/githubnew.svg" alt="GitHub" />, 
  postman: () => <LocalIcon src="/assets/postman.svg" alt="Postman" />, 
  react: () => <LocalIcon src="/assets/react.svg" alt="React" />, 
  tailwind: () => <LocalIcon src="/assets/Tailwind.svg" alt="Tailwind CSS" />, 
  mongodb: () => <LocalIcon src="/assets/MongoDB.svg" alt="MongoDB" />, 
  node: () => <LocalIcon src="/assets/nodejs.svg" alt="Node.js" />, 
  express: () => <LocalIcon src="/assets/expressjs-dark.svg" alt="Express" />, 
  vscode: () => <LocalIcon src="/assets/vscode.svg" alt="VS Code" />, 
  c: () => <LocalIcon src="/assets/C.svg" alt="C" />, 
  java: () => <LocalIcon src="/assets/Java.svg" alt="Java" />, 
  python: () => <LocalIcon src="/assets/Python.svg" alt="Python" />, 
  sql: () => <LocalIcon src="/assets/sql.svg" alt="SQL" />, 
  mysql: () => <LocalIcon src="/assets/mysql.svg" alt="MySQL" />, 
  postgresql: () => <LocalIcon src="/assets/postgresql.svg" alt="PostgreSQL" />, 
  bootstrap: () => <LocalIcon src="/assets/bootstrap.svg" alt="Bootstrap" />, 
  copilot: () => <LocalIcon src="/assets/github-copilot-dark.svg" alt="GitHub Copilot" />, 
  websockets: () => <LocalIcon src="/assets/websocket.svg" alt="WebSockets" />, 
  socketio: () => <LocalIcon src="/assets/socket.svg" alt="Socket.io" />, 
  numpy: () => <LocalIcon src="/assets/numpy.svg" alt="NumPy" />, 
  pandas: () => <LocalIcon src="/assets/Pandas.svg" alt="Pandas" />, 
  matplotlib: () => <LocalIcon src="/assets/Matplotlib.svg" alt="Matplotlib" />, 
  seaborn: () => <LocalIcon src="/assets/seaborn-1.svg" alt="Seaborn" />, 
  ml: () => <LocalIcon src="/assets/ml.svg" alt="Machine Learning" />, 
  lightbulb: Lightbulb, 
  message: MessageSquare, 
  users: Users, 
  clock: Clock, 
  compass: Compass, 
  brain: Brain, 
};


export function StackIcon({ name, className }) {
  const cleanName = name ? name.toLowerCase().trim() : "";
  const IconComponent = iconMap[cleanName] || Code2;

  return (
    <div className={className} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <IconComponent />
    </div>
  );
}

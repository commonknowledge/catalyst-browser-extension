import path from "path";

// Canonical path shortcuts
const project: { [dir: string]: (...pathname: string[]) => string } = {};
project.root = (...pathname) => path.resolve(__dirname, "./", ...pathname);
project.nodeModules = (...pathname) =>
  project.root("node_modules", ...pathname);
project.src = (...pathname) => path.resolve(project.root("src"), ...pathname);
project.dist = (...pathname) => path.resolve(project.root("dist"), ...pathname);
const gitCommit = process.env.SOURCE_VERSION || "test-build";

export { project, gitCommit };

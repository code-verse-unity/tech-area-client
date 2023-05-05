interface IRoute {
  title: string;
  path: string;
  element: JSX.Element;
}

const ROUTES: IRoute[] = [
  {
    title: "Home",
    path: "/",
    element: <div>home</div>,
  },
];

export default ROUTES;

import { Header } from "../components/Header";

type Props = {
  children: JSX.Element
  activeRoute: string
}

function MainLayout({ children, activeRoute }: Props) {
  return (
    <div className="mx-auto w-full max-w-4xl px-2 xl:px-0 min-h-screen flex flex-col pb-4 xl:pb-16">
      <Header currentRoute={activeRoute} />

      <div className="bg-white p-4 xl:p-16 rounded-2xl shadow-md flex-1">
        {children}
      </div>
    </div>
  )
}

export default MainLayout

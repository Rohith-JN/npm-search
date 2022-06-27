import SideBar from "./SideBar"

export default function Layout({ children }: { children: any }) {
    return (
        <>
            <SideBar />
            <main>{children}</main>
        </>
    )
}
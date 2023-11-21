import Sidebar from "./_components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full ">
            <div className="hidden md:flex flex-col fixed h-full w-56 inset-y-0 z-50">
                <Sidebar />
            </div>
            {children}
        </div>
     );
}
 
export default DashboardLayout;
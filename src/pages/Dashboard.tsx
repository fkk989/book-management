
import { Books } from "../components/Books";
import { BookStats } from "../components/BookStats";
import { Header } from "../components/Header";
import { Toaster } from "react-hot-toast";

export const Dashboard = () => {
    return (
        <div className="w-[100vw] min-h-screen bg-background">
            <div className="w-full flex flex-col justify-center items-center py-[20px] px-[10px] md:p-[40px]">
                {/* Header */}
                <Header />

                {/* stats */}
                <div className="w-full mt-[30px] md:mt-[50px]">
                    <BookStats />
                </div>

                {/* Books */}
                <Books />
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

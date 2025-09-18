import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export const NotFound = () => {
    const navigation = useNavigate()
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
                <Button
                    variant={"outline"}
                    className="text-blue-500 underline hover:text-blue-700"
                    onClick={() => navigation("/")}
                >
                    Return to Home
                </Button>
            </div>
        </div>
    );
};
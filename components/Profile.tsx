"use client";
import React, { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { auth, SignOut } from "@/lib/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user]);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="ml-10 pl-1 flex justify-center center">
                    <button
                        className={buttonVariants({
                            size: "icon",
                            variant: "ghost",
                        })}
                    >
                        <Icons.user className="h-5 w-5" />
                    </button>
                    <span className="opacity-80 pt-2">{user?.displayName}</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => SignOut()}>
                    Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Profile;

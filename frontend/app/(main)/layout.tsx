"use client";

import Toast from "@/components/toast";
import { useContext } from "react";
import { ToastContext } from "../providers";

export default function Layout({ children }: { children: React.ReactNode }) {
    const toast = useContext(ToastContext);

    return (
        <section>
            {
                toast.message && (
                    <Toast message={toast.message} type={toast.type} onDismiss={() => {
                        toast.dismiss();
                    }} />
                )
            }
            {children}
        </section>
    );
}
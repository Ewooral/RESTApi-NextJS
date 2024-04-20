"use client";
import withAuth from "@/components/HigherOrderComponent";
import AdminLeftSidebar from "./AdminLeftSidebar";
import AdminHeader from "./AdminHeader";
import {Toaster} from "@/components/ui/toaster";
import {useRouter} from 'next/router';
import UsersHome from "./users/UsersHome";
import {useState} from "react";
import React from "react";

interface LayoutProps {
    children?: React.ReactNode
}

type HasItCollapsed = boolean;
type SetIsCollapsed = React.Dispatch<React.SetStateAction<boolean>>;

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [isCollapsed, setIsCollapsed] = useState<HasItCollapsed>(false)


    const childrenWithProps = React.Children.map(children, child => {
        // Checking isValidElement is the safe way and avoids a typescript error too.
        if (React.isValidElement(child)) {
            // @ts-ignore
            return React.cloneElement(child, {isCollapsed: isCollapsed, setIsCollapsed: setIsCollapsed});
        }
        return child;
    });
    /** EXPLANATION OF THE `childrenWithProps` FUNCTION
     * let's imagine we're talking about a school bus full of children, where each child represents a piece of your website or app.
     * Now, the bus driver (the Layout component) wants to give each child a candy (the isCollapsed prop). But, he can't just throw
     * the candies in the air and hope each child catches one. He needs to hand them out one by one.
     * So, he walks down the aisle of the bus (the React.Children.map function), and for each child
     * (each child in the map function), he checks if they're awake (the React.isValidElement
     * function). If a child is awake (if React.isValidElement(child) is true), he gives them a
     * candy (he clones the child and adds the isCollapsed prop to it with React.cloneElement(child, {isCollapsed: isCollapsed})).
     * If a child is asleep (if React.isValidElement(child) is false), he just moves on to the next one (returns the child as it is).
     * In the end, each awake child on the bus has a candy, and the driver can continue driving (the Layout component can continue rendering).
     *
     */


    return (
            <div className="flex relative z-10"
                 style={{
                    // backgroundImage: 'linear-gradient(rgba(163, 163, 163), rgba(163, 163, 163, 0.5)), url(https://res.cloudinary.com/dn1lqngds/image/upload/v1713192842/uploads/backgroundimageA.jpg.jpg)',
                    //  backgroundSize: 'cover',
                    //  backgroundPosition: 'center center',
                     background:'#eaeaea'
                 }}>
                {/*@ts-ignore*/}
                <AdminLeftSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>

                <div className="flex-1 text-sm ml=auto mr-auto">
                    <AdminHeader/>
                    <Toaster/>
                    <div className="mt-[36px] p-6">
                        {childrenWithProps}
                    </div>
                </div>
            </div>
    );
}

// export default withAuth(Layout);

export default Layout
import React from "react";
import { DefaultProp } from "../Utils/DefaultProp";

const PageWrapper: React.FC<DefaultProp> = ({ children }) => {
    return <div className="page">
        {children}
    </div>
}

export default PageWrapper;
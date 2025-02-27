import React from "react"
import Skeleton, { SkeletonTheme} from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

import "./Skeleton.css"

function SkeletonHero() {


    return (
        <div className="SkeletonHero">
            <SkeletonTheme baseColor="var(--primary)" highlightColor="var(--secondary)">
                <div className="SkeletonHero__img">
                    <Skeleton className="img" />
                </div>
                <div className="SkeletonHero__side">
                    <Skeleton className="side" />
                    <Skeleton className="side" />
                    <Skeleton className="circle" />
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default SkeletonHero
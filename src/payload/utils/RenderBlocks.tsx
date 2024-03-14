// @ts-nocheck

import { blocks } from "../blockList";
import React from "react";

const RenderBlocks = ({ layout }) => {

    // console.log('layout', layout);

    return (
        <div>
            {layout.map((block, index) => {

                const Block = blocks[block.blockType];
                if (Block) {
                    return <Block key={index} {...block} />;
                }

                return null;
            })}
        </div>
    )

}

export default RenderBlocks;
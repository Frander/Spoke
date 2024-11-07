import React from "react";
import NodeEditor from "./NodeEditor";
import StringInput from "../inputs/StringInput";
import PropTypes from "prop-types";
import { Cube } from "styled-icons/fa-solid/Cube";
import useSetPropertySelected from "./useSetPropertySelected";

export default function IframeNodeEditor(props) {
    const { editor, node } = props;
    const onChangeSrc = useSetPropertySelected(editor, "src");
    return <NodeEditor {...props} description={IframeNodeEditor.description} >
        <StringInput
            name="src"
            value={node.src}
            onChange={onChangeSrc} />
    </NodeEditor>;
}

IframeNodeEditor.iconComponent = Cube;

IframeNodeEditor.description =
    "Show Iframe";

IframeNodeEditor.propTypes = {
    editor: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired
};
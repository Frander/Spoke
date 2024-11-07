import { Mesh, MeshBasicMaterial, BoxBufferGeometry, Scene } from "three";
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import EditorNodeMixin from "./EditorNodeMixin";

export default class IframeNode extends EditorNodeMixin(Mesh) {
    static componentName = "iframe";

    static nodeName = "Iframe";

    constructor(editor) {
        super(editor, new THREE.PlaneBufferGeometry(10, 10, 1, 1), new THREE.ShaderMaterial({
            fragmentShader: `void main() {
              gl_FragColor = vec4(0, 0, 0, 0);
            }`,
            side: THREE.DoubleSide
        }));

        this.src = "https://www.youtube.com/embed/4iWrk6wNw-c";
    }

    static async deserialize(editor, json, loadAsync, onError) {
        const node = await super.deserialize(editor, json);
        const { src } = json.components.find(c => c.name === IframeNode.componentName).props;
        console.log(json.components.find(c => c.name === IframeNode.componentName))
        console.log("deserialize")
        console.log(src)
        console.log(node)
        node.src = src === undefined ? "https://www.youtube.com/embed/4iWrk6wNw-c" : src;

        return node;
    }

    serialize() {
        return super.serialize({
            [IframeNode.componentName]: {
                src: this.src
            }
        });
    }

    copy(source, recursive = true) {
        super.copy(source, recursive);
        this.src = source.src
        return this;
    }

    prepareForExport() {
        // You need to call the super method for the GLTFExporter to properly work with this object.
        super.prepareForExport();

        // Then we can add the rotate component and set the speed component.
        this.addGLTFComponent("iframe", {
            src: this.src
        });
    }
}
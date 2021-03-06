const _ = require("lodash");
const XMLElement = require("./xml_element");

class TOCElement extends XMLElement{
    constructor(type = "Default") {
        super("toc_element", false, true);
        this._label = {
            "type": "element",
            "name": "toc_label",
            "elements": []
        };
        this._type = {
            "type": "element",
            "name": "toc_type",
            "elements": [
                {
                    "type": "text",
                    "text": type
                }
            ]
        };
        this._elements[0] = this._label;
        this._elements[1] = this._type;
        // _elements ==> starts with [label, type]
        // _elements ==> over time push(newElements)
        // .elements ==> _concat(_elements, footnotes)
    }

    get tocLabel() {
        this.getParagraphTextField("_label");
    }

    set tocLabel(newLabel) {
        this.setParagraphTextField("_label", newLabel);
    }

    get tocType() {    
        return this._type.elements[0].text;
    }

    set tocType(newType) {
        this._type.elements[0].text = newType;
    }

    insertSectionElement(secElement) {
        /* 
            - Pushes the new section element onto the elements array of the TocElement
        */
        this._elements.push(secElement.toObjectLiteral().elements[0]);
    }
}

module.exports = TOCElement;
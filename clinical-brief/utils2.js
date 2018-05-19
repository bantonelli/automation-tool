var convert = require('xml-js');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

function cleanHTML(string) {
    // Removes ALL HTML: 
        // var str = string.replace(/\(Insert.*\)/, "").replace(/<{1}[^<>]{1,}>{1}/g," ");    
    
    // Removes (Insert ...) statements 
    var str = string.replace(/\(Insert.*\)/, "");

    // Removes certain tags and replaces them with flags for later use 
    // var tags = ["em", "strong"];
    // for (var i = 0; i < tags.length; i++) {
    //     var tag = tags[i];
    //     var regexp = new RegExp(`<${tag}>.\s<\\/${tag}>|<${tag}>[\S]{0,1}<\\/${tag}>`, 'gi');
    //     str.replace(regexp, `||${tag}||`);
    // }
    var options =   {
        allowedTags: [ 'p', 'em', 'strong', 'sup' ],
        allowedAttributes: {
          'sup': ["type"],
        },
        allowedClasses: {},
        exclusiveFilter: function(frame) {
            // return frame.tag === 'a' && !frame.text.trim();
            return !frame.text.trim();
        }
    }
    var clean = sanitizeHtml(str, options);
    return clean;
}

function xmlStringToJS(xmlString) {
    var options = { compact: false, alwaysChildren: true, spaces: 4 };
    var result = convert.xml2js(xmlString, options);
    return result;
}

function xmlFileToJS(pathToFile) {
    var xml = fs.readFileSync(pathToFile, 'utf8');
    var options = { compact: false, alwaysChildren: true, ignoreComment: true, alwaysChildren: true };
    var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)
    return result;
}

function writeXMLFromObject(object, pathToFile) {
    // Need options or the file will be output as empty. 
    var options = { compact: false, fullTagEmptyElement: true};
    var result = convert.js2xml(object, options);
    fs.writeFile(pathToFile, result, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The new file was created!");
    });
}

module.exports = {
    xmlStringToJS,
    xmlFileToJS,
    writeXMLFromObject,
    cleanHTML
};
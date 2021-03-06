const sanitizeHtml = require('sanitize-html');
const formatList = require('./format-list');

/*
Common Entities / Things to remove: 
&#9744; --> Empty checkbox
&#9746; --> Filled checkbox 
&#8226; --> Unordered List bullet 
<tt>o     </tt> --> Unorder List Sub-bullet 
*/

function paragraph(string) {
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

function unorderedList(string) {
    var str = string.replace(/\(Insert.*\)/, "");
    var options =   {
        allowedTags: [ 'ul', 'li', 'em', 'strong', 'sup', 'tt' ],
        allowedAttributes: {
          'sup': ["type"],
        },
        parser: {
            decodeEntities: false
        },
        exclusiveFilter: function(frame) {
            // return frame.tag === 'a' && !frame.text.trim();
            return !frame.text.trim();
        }
    }
    
    // General Cleanup 
    var clean = sanitizeHtml(str, options);

    // Remove &amp; from before entitities 
    var entityRegexp = new RegExp(`&amp;([A-Za-z]+|#?[0-9]+);`, 'g');
    clean = clean.replace(entityRegexp, "&$1;");
    // console.log(formatList.formatUlItems);
    clean = formatList.formatUlItems(clean, null, formatList.formatUlItems);

    var ttRegExp = new RegExp(`</tt>`, 'g');
    clean = clean.replace(ttRegExp, "");
    return clean;
}

function slides(str) {
/*
TODO: 
- Add support for edge cases: 
    1) Remove Random <strong> tags in headline if any 
    2) Also check for case where there is 1 or more greater than / less than. 
    3) Also check for case where bracket doesn't directly follow sup tag 
        - When there is a space in between them.  
*/
    
    str = unorderedList(str);
    var h3RegExp = new RegExp(`<strong>&lt;&lt;Level 2&gt;&gt;(.*)</strong>`, 'g');
    str = str.replace(h3RegExp, "<h3>$1</h3>");

    var supRegExp = new RegExp(`<sup>\\[`, 'g');
    str = str.replace(supRegExp, '<sup type="ref">[');
    return str;
}





module.exports = {
    paragraph,
    unorderedList,
    slides
}; 
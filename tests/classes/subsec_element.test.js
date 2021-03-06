const SubsectionElement = require("../../classes/subsec_element");
const fs = require('fs');
const _ = require("lodash");
const utils = require("../../utils");
const expect = require('chai').expect;


describe('Subsection Element', function () {
    /*
    Main sections to test: 
      1) Clinical Context 
      2) Synopsis and Perspective 
      3) Study Highlights
      4) Clinical Implications 
      5) Contributor Byline 
      6) 
    */

    var subsectionContent;
    var completeSubsection;
    var subsectionInstance;  
    beforeEach(function() {
        // fs.readFileSync(__dirname + '/input/article.html', 'utf8');
        completeSubsection = require('./input/subsection');
        subsectionContent = require('./input/subsection_content'); 
        subsectionInstance = new SubsectionElement();
        subsectionInstance.subsectionHeader = "My Subsection";
    });
    
    describe('#insertSubsectionContent()', function () {
        it('should merge subsection content into main subsection element', function (done) {
            subsectionInstance.insertSubsectionContent(subsectionContent);
            // subsectionInstance.qnaForm = 3;

            // fs.writeFileSync(
            //     __dirname + "/output/insert_subsection_content.json", 
            //     JSON.stringify(subsectionInstance.toObjectLiteral(), undefined, 2), 
            //     function(err) {
            //         if(err) {
            //             return console.log(err);
            //         }
            //     }
            // ); 
            expect(subsectionInstance.toObjectLiteral()).to.deep.equal(completeSubsection);
            done();
        });
    });

});

// eslint-disable-next-line
import Smilies from './smilies'
let numberKibt = value => {
    return parseFloat(value).toLocaleString()
}

//Emoticons emoji Smilies
let EmoticonDecode = (value) => {
    return replaceEmoticons(value)
        // let smileCode = /\[.*?\]/g;

    // let smileContent = value.match(smileCode);

    // console.log('内容的😂', smileContent)

    // return '<img data-emoticon="" class="smileImg" alt="[表情]" src="' + require(`@/assets/avatar0.jpg`) + '">' + value;
}


let EmoticonSrc = (url, type) => {
    let src = require('@/assets/smilies/' + type + '/' + url);
    return src;
}

function RegExpEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/gi, "\\$&");
}

function Array2Object(text) {
    let newObj = {};
    for (let i = 0; i < text.length; i++) {
        let key = '['+ text[i].text +']'
        newObj[key] = text[i].url
    }
    return newObj;
}
//reference https://stackoverflow.com/questions/48961628/2-emoticons-in-object-is-not-replaced-correctly-javascript
//reference https://stackoverflow.com/questions/37953761/javascript-regex-replace-text-with-emoticons/37954137
function replaceEmoticons(text) {
    // var emoticons = {
    //     ':-o': 'smile.gif',
    //     ':(': 'sad.gif',
    //     ':neutral:': 'wink.gif'
    // }
    var emoticons = Array2Object(JSON.parse(JSON.stringify(Smilies.emoticons)).default)
    var result = text;
    var emotcode;
    var regex;
    for (emotcode in emoticons) {
        regex = new RegExp(RegExpEscape(emotcode), 'gi');
        // eslint-disable-next-line
        // regex = '/:\\-o/gi'

        // console.log(regex);
        result = result.replace(regex, function(match) {
            var pic = emoticons[match];
            if (pic != undefined) {
                return '<img data-emoticon="' + match + '" alt="' + match + '" class="smileImg" src="' + require('@/assets/smilies/default/' + pic) + '"/>';
            } else {
                return match;
            }
        });
    }
    return result;
}

export default {
    numberKibt,
    EmoticonDecode,
    EmoticonSrc
}
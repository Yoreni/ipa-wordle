import CKeyImage from "../assets/C_Key_Light.png"
import EKeyImage from "../assets/E_Key_Light.png"
import QKeyImage from "../assets/Q_Key_Light.png"
import YKeyImage from "../assets/Y_Key_Light.png"
import OKeyImage from "../assets/O_Key_Light.png"
import IKeyImage from "../assets/I_Key_Light.png"
import UKeyImage from "../assets/U_Key_Light.png"
import JKeyImage from "../assets/J_Key_Light.png"
import XKeyImage from "../assets/X_Key_Light.png"
// import WKeyImage from "../assets/E_Key_Light.png"
import Key0Image from "../assets/0_Key_Light.png"
import Key1Image from "../assets/1_Key_Light.png"
import Key2Image from "../assets/2_Key_Light.png"
import Key3Image from "../assets/3_Key_Light.png"
import Key4Image from "../assets/4_Key_Light.png"
import Key5Image from "../assets/5_Key_Light.png"
import Key6Image from "../assets/6_Key_Light.png"
import Key7Image from "../assets/7_Key_Light.png"
import Key8Image from "../assets/8_Key_Light.png"
import Key9Image from "../assets/9_Key_Light.png"







const keyClasses = ["undiscovered", "not-in-word", "almost-hint", "correct"]
const row0 = ["ɑː", "ɛː", "oː", "ɪː", "ɵː", "əː", "ɑj", "ɛj", "ɪj", "oj", "θ", "ð"]
const row1 = "ŋwɛrtjɵɪɔpʃʒ".split("")
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'ʤ', 'k', 'l', "aw", "ʉw", "əw"]
const row3 = "zəʧvbnm".split("")

const keyHints = {
    // "ɑː": "a a",
    // "ɛː": "e e",
    // "ɪː": "i i",
    // "oː": "o o",
    // "ɵː": "u u",
    // "əː": "x x",
    // "ɑj": "a y",
    // "ɛj": "e y",
    // "ɪj": "i y",
    // "oj": "o y",
    // "θ": "-",
    // "ð": "=",
    // "ʃ": "[",
    // "ʒ": "]",
    // "aw": "a w",
    // "ʉw": "u w",
    // "əw": "#",
    "ŋ": QKeyImage,
    "ɛ": EKeyImage,
    "j": YKeyImage,
    "ɵ": UKeyImage,
    "ɪ": IKeyImage,
    "ɔ": OKeyImage,
    "ʤ": JKeyImage,
    "ə": XKeyImage,
    "ʧ": CKeyImage,
}

function Key( {char, onPress, hints} )
{
    function getClass()
    {
        if (hints === undefined)
            return keyClasses[0]
        const hint = hints[char]
        return keyClasses[hint] ?? keyClasses[0]
    }

    return (
        <button onClick={() => onPress(char)} className={`${getClass()} key`}>
            <span className="centre">{char}</span>
            {/* <span className="key-hint">{keyHints[char] ?? ""}</span> */}
            {keyHints[char] && <img src={keyHints[char]} className="key-hint" style={{"width": "24px", "height": "24px"}}></img>}
        </button>
    )
}

/*
    Hints number guide
    0: Undiscovered - white
    1: Not in world - grey
    2: In word but wrong position - yellow
    3: In word and right position - green
*/

export function Keyboard( {onPress, onBackspace, onEnter, hintsRef} )
{
    const hints = hintsRef.current

    function makeRow(chars)
    {
        return (
        <div>
            {chars.map(char => <Key key={char} onPress={onPress} char={char} hints={hints}/>)}
        </div>)
    }

    return (
    <>
        {makeRow(row0)}
        {makeRow(row1)}
        {makeRow(row2)}
        {makeRow(row3)}
        <div>
            <Key char="Backspace" key="0" onPress={onBackspace}/>
            <Key char="Enter" key="1" onPress={onEnter}/>
        </div>
    </>)
}
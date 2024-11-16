import CKeyImage from "../assets/C_Key_Light.png"
import EKeyImage from "../assets/E_Key_Light.png"
import QKeyImage from "../assets/Q_Key_Light.png"
import YKeyImage from "../assets/Y_Key_Light.png"
import OKeyImage from "../assets/O_Key_Light.png"
import IKeyImage from "../assets/I_Key_Light.png"
import UKeyImage from "../assets/U_Key_Light.png"
import JKeyImage from "../assets/J_Key_Light.png"
import XKeyImage from "../assets/X_Key_Light.png"
import AKeyImage from "../assets/A_Key_Light.png"
import WKeyImage from "../assets/W_Key_Light.png"
import LeftBracetKeyImage from "../assets/Bracket_Left_Key_Light.png"
import RightBracetKeyImage from "../assets/Bracket_Right_Key_Light.png"
import HashKeyImage from "../assets/Hash_Key_Light.png"
import MinusKeyImage from "../assets/Minus_Key_Light.png"
import EqualsKeyImage from "../assets/Equals_Key_Light.png"





const keyClasses = ["undiscovered", "not-in-word", "almost-hint", "correct"]
const row0 = ["ɑː", "ɛː", "oː", "ɪː", "ɵː", "əː", "ɑj", "ɛj", "ɪj", "oj", "θ", "ð"]
const row1 = "ŋwɛrtjɵɪɔpʃʒ".split("")
const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'ʤ', 'k', 'l', "aw", "ʉw", "əw"]
const row3 = "zəʧvbnm".split("")

const keyHints = {
    "ɑː": new Array(2).fill(AKeyImage),
    "ɛː": new Array(2).fill(EKeyImage),
    "ɪː": new Array(2).fill(IKeyImage),
    "oː": new Array(2).fill(OKeyImage),
    "ɵː": new Array(2).fill(UKeyImage),
    "əː": new Array(2).fill(XKeyImage),
    "ɑj": [AKeyImage, YKeyImage],
    "ɛj": [EKeyImage, YKeyImage],
    "ɪj": [IKeyImage, YKeyImage],
    "oj": [OKeyImage, YKeyImage],
    "θ": [MinusKeyImage],
    "ð": [EqualsKeyImage],
    "ʃ": [LeftBracetKeyImage],
    "ʒ": [RightBracetKeyImage],
    "aw": [AKeyImage, WKeyImage],
    "ʉw": [UKeyImage, WKeyImage],
    "əw": [HashKeyImage],
    "ŋ": [QKeyImage],
    "ɛ": [EKeyImage],
    "j": [YKeyImage],
    "ɵ": [UKeyImage],
    "ɪ": [IKeyImage],
    "ɔ": [OKeyImage],
    "ʤ": [JKeyImage],
    "ə": [XKeyImage],
    "ʧ": [CKeyImage],
}

function KeybindDisplay( {char} )
{
    const keybind = keyHints[char]
    if (!keybind)
        return

    const style = {"width": "24px", "height": "24px", "margin": "-2px"}

    return (
    <span className="key-hint">
        <img src={keybind[0]} style={style} />
        {keybind[1] && <img src={keybind[1]} style={style} />}
    </span>
    )
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

    let keybindDisplay;
    if (keyHints[char])
        keybindDisplay = keyHints[char].map(imgSrc => <img src={imgSrc} className="key-hint" style={{"width": "24px", "height": "24px"}} />)

    return (
        <button onClick={() => onPress(char)} className={`${getClass()} key`}>
            <span className="centre">{char}</span>
            <KeybindDisplay char={char}/> 
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
    <div className="keyboard">
        {makeRow(row0)}
        {makeRow(row1)}
        {makeRow(row2)}
        {makeRow(row3)}
        <div>
            <Key char="Backspace" key="0" onPress={onBackspace}/>
            <Key char="Enter" key="1" onPress={onEnter}/>
        </div>
    </div>)
}